import { Component, ElementRef, HostListener, ViewChild, computed, inject, signal } from '@angular/core';
import gsap from 'gsap';
import { AtmosphereComponent } from '../../core/components/atmosphere/atmosphere.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { LoaderComponent } from '../../core/components/loader/loader.component';
import { TimeSliderComponent } from '../../core/components/time-slider/time-slider.component';
import { ThemeService } from '../../core/services/theme.service';

/** Fraction of the viewport height the hero-to-dashboard morph plays out over. */
const MORPH_FRACTION = 0.7;
/** Scroll distance (px) past which the header is considered "stuck". */
const HEADER_REVEAL_AT = 40;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AtmosphereComponent, HeaderComponent, LoaderComponent, TimeSliderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly showLoader = signal(true);
  protected readonly scrollY = signal(0);
  protected readonly windowHeight = signal(typeof window !== 'undefined' ? window.innerHeight : 800);

  @ViewChild('wordmark') wordmark!: ElementRef<HTMLDivElement>;
  @ViewChild('tagline') tagline!: ElementRef<HTMLDivElement>;
  @ViewChild('phaseLabel') phaseLabel!: ElementRef<HTMLDivElement>;

  protected readonly isHeaderStuck = computed(() => this.scrollY() > HEADER_REVEAL_AT);

  // The spacer that creates the scroll runway is sized to the same distance
  // the morph plays out over, so the dashboard content is exactly ready the
  // moment the hero finishes dissolving — no dead zone in between.
  protected readonly morphDistance = computed(() => this.windowHeight() * MORPH_FRACTION);

  protected readonly heroProgress = computed(() => Math.min(1, this.scrollY() / this.morphDistance()));

  protected readonly heroOpacity = computed(() => 1 - this.heroProgress());

  protected readonly heroTransform = computed(() => {
    const p = this.heroProgress();
    return `translateY(${-p * 60}px) scale(${1 - p * 0.14})`;
  });

  protected readonly heroFilter = computed(() => `blur(${this.heroProgress() * 6}px)`);

  protected readonly heroInert = computed(() => this.heroProgress() > 0.85);

  protected readonly homeOpacity = computed(() => this.heroProgress());

  protected readonly homeTransform = computed(() => {
    const p = this.heroProgress();
    return `translateY(${(1 - p) * 28}px) scale(${0.94 + p * 0.06})`;
  });

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY.set(window.scrollY || document.documentElement.scrollTop || 0);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.windowHeight.set(window.innerHeight);
  }

  onLoaderFinished(): void {
    this.showLoader.set(false);
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from(this.wordmark.nativeElement, { opacity: 0, y: 18, duration: 0.9 })
      .from(this.tagline.nativeElement, { opacity: 0, y: 12, duration: 0.7 }, '-=0.5')
      .from(this.phaseLabel.nativeElement, { opacity: 0, y: 8, duration: 0.6 }, '-=0.4');
  }
}
