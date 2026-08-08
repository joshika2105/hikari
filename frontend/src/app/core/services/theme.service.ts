import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export interface PaletteTokens {
  bg: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  glow: string;
}

export interface ThemeTokens extends PaletteTokens {
  text: string;
  textOn: string;
}

interface Keyframe {
  m: number;
  p: PaletteTokens;
  l: string;
}

const PALETTES: Record<string, PaletteTokens> = {
  morning: { bg: '#F7F3FA', primary: '#B58CC6', secondary: '#D9B8D8', accent: '#E8A8B8', border: '#E8DDEB', glow: '#F3C9D8' },
  day: { bg: '#F5F7FC', primary: '#8B82C9', secondary: '#A9B9E8', accent: '#89B9D9', border: '#DEE3F0', glow: '#C8D6F4' },
  sunset: { bg: '#FBF1F0', primary: '#A875A9', secondary: '#D49A9E', accent: '#E5A76F', border: '#EEDDDC', glow: '#F3C29C' },
  night: { bg: '#111321', primary: '#9B8BD4', secondary: '#6F73B5', accent: '#C2A7E8', border: '#2C3045', glow: '#62589A' },
  dawn: { bg: '#2B2140', primary: '#D98CA0', secondary: '#B58CC6', accent: '#F2B88F', border: '#4A3B5C', glow: '#E8A9C4' },
  dusk: { bg: '#3A2438', primary: '#C77B99', secondary: '#8B6FA8', accent: '#E08A5C', border: '#553C51', glow: '#E5A76F' },
};

const KEYFRAMES: Keyframe[] = [
  { m: 0, p: PALETTES['night'], l: 'Night' },
  { m: 300, p: PALETTES['night'], l: 'Night' },
  { m: 330, p: PALETTES['dawn'], l: 'Dawn' },
  { m: 360, p: PALETTES['morning'], l: 'Morning' },
  { m: 540, p: PALETTES['morning'], l: 'Morning' },
  { m: 660, p: PALETTES['day'], l: 'Day' },
  { m: 1020, p: PALETTES['day'], l: 'Day' },
  { m: 1200, p: PALETTES['sunset'], l: 'Sunset' },
  { m: 1230, p: PALETTES['dusk'], l: 'Dusk' },
  { m: 1260, p: PALETTES['night'], l: 'Night' },
  { m: 1440, p: PALETTES['night'], l: 'Night' },
];

// The brand anchors cycle underneath the macro phase, one every 4 hours, so
// the aura visibly drifts roughly once an hour instead of holding a flat
// color for most of the day.
const BRAND_CYCLE = ['#9B82C9', '#C8B6E8', '#E6A9C4', '#F2C49B'];

const PRESET_MIN: Record<string, number> = {
  morning: 7 * 60 + 30,
  day: 13 * 60,
  sunset: 19 * 60,
  night: 22 * 60 + 30,
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function lerpHex(a: string, b: string, t: number): string {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const r = Math.round(A[0] + (B[0] - A[0]) * t);
  const g = Math.round(A[1] + (B[1] - A[1]) * t);
  const bl = Math.round(A[2] + (B[2] - A[2]) * t);
  return '#' + [r, g, bl].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function brandForHour(hourFloat: number): string {
  const idx = ((hourFloat % 4) + 4) % 4;
  const base = Math.floor(idx);
  const t = idx - base;
  return lerpHex(BRAND_CYCLE[base % 4], BRAND_CYCLE[(base + 1) % 4], t);
}

function currentMinuteOfDay(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  /** Minute of day, 0–1439. Starts at the real current time; drag the slider to override. */
  readonly minute = signal<number>(currentMinuteOfDay());

  private readonly resolved = computed(() => this.tokensFor(this.minute()));

  readonly tokens = computed<ThemeTokens>(() => this.resolved().tokens);
  readonly label = computed<string>(() => this.resolved().label);

  readonly clock = computed<string>(() => {
    const m = Math.round(this.minute()) % 1440;
    const hh = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    return `${hh}:${mm}`;
  });

  readonly activePreset = computed<string | null>(() => {
    const m = Math.round(this.minute()) % 1440;
    for (const [name, target] of Object.entries(PRESET_MIN)) {
      const diff = Math.abs(((target - m + 720 + 1440) % 1440) - 720);
      if (diff < 90) return name;
    }
    return null;
  });

  readonly presetNames = Object.keys(PRESET_MIN);

  constructor() {
    // Push tokens onto :root as CSS custom properties, matching how the
    // original prototype's applyMinute() drove the styling.
    effect(() => {
      const t = this.tokens();
      const root = this.document.documentElement.style;
      root.setProperty('--bg', t.bg);
      root.setProperty('--primary', t.primary);
      root.setProperty('--secondary', t.secondary);
      root.setProperty('--accent', t.accent);
      root.setProperty('--text', t.text);
      root.setProperty('--muted', t.textOn);
      root.setProperty('--border', t.border);
      root.setProperty('--glow', t.glow);
    });
  }

  setMinute(minute: number): void {
    this.minute.set(((minute % 1440) + 1440) % 1440);
  }

  setPreset(name: string): void {
    const target = PRESET_MIN[name];
    if (target !== undefined) this.minute.set(target);
  }

  private tokensFor(minute: number): { tokens: ThemeTokens; label: string } {
    const m = ((minute % 1440) + 1440) % 1440;

    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
      const s = KEYFRAMES[i];
      const e = KEYFRAMES[i + 1];
      if (m < s.m || m > e.m) continue;

      const t = e.m === s.m ? 0 : (m - s.m) / (e.m - s.m);
      const macro: PaletteTokens = {
        bg: lerpHex(s.p.bg, e.p.bg, t),
        primary: lerpHex(s.p.primary, e.p.primary, t),
        secondary: lerpHex(s.p.secondary, e.p.secondary, t),
        accent: lerpHex(s.p.accent, e.p.accent, t),
        border: lerpHex(s.p.border, e.p.border, t),
        glow: lerpHex(s.p.glow, e.p.glow, t),
      };
      const label = s.l === e.l ? s.l : `${s.l} \u2192 ${e.l} Transition`;

      const hourFloat = m / 60;
      const brandNow = brandForHour(hourFloat);
      const brandB = brandForHour(hourFloat + 1.3);
      const brandC = brandForHour(hourFloat + 2.6);

      const tokens: ThemeTokens = {
        bg: macro.bg,
        border: macro.border,
        glow: macro.glow,
        primary: lerpHex(macro.primary, brandNow, 0.4),
        secondary: lerpHex(macro.secondary, brandB, 0.35),
        accent: lerpHex(macro.accent, brandC, 0.35),
        text: '',
        textOn: '',
      };
      const isDark = luminance(tokens.bg) < 0.5;
      tokens.text = isDark ? '#FFFFFF' : '#000000';
      tokens.textOn = isDark ? 'rgba(255,255,255,0.68)' : 'rgba(0,0,0,0.62)';

      return { tokens, label };
    }

    const fallback: ThemeTokens = { ...PALETTES['night'], text: '#FFFFFF', textOn: 'rgba(255,255,255,0.68)' };
    return { tokens: fallback, label: 'Night' };
  }
}
