import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import gsap from 'gsap';
import { ThemeService } from '../../services/theme.service';

interface BlobConfig {
  x: number;
  y: number;
  scale: number;
  duration: number;
}

const BLOB_MOTION: BlobConfig[] = [
  { x: 48, y: -32, scale: 1.06, duration: 13 },
  { x: -36, y: 40, scale: 0.95, duration: 15 },
  { x: 30, y: 34, scale: 1.08, duration: 11 },
  { x: -28, y: -26, scale: 0.94, duration: 17 },
  { x: 0, y: 0, scale: 1.0, duration: 20 },
];

@Component({
  selector: 'app-atmosphere',
  standalone: true,
  templateUrl: './atmosphere.component.html',
  styleUrl: './atmosphere.component.scss',
})
export class AtmosphereComponent implements AfterViewInit, OnDestroy {
  protected readonly theme = inject(ThemeService);

  @ViewChild('blob1') blob1!: ElementRef<HTMLDivElement>;
  @ViewChild('blob2') blob2!: ElementRef<HTMLDivElement>;
  @ViewChild('blob3') blob3!: ElementRef<HTMLDivElement>;
  @ViewChild('blob4') blob4!: ElementRef<HTMLDivElement>;
  @ViewChild('blob5') blob5!: ElementRef<HTMLDivElement>;

  private tweens: gsap.core.Tween[] = [];

  ngAfterViewInit(): void {
    const els = [this.blob1, this.blob2, this.blob3, this.blob4, this.blob5];

    els.forEach((ref, i) => {
      const cfg = BLOB_MOTION[i];
      const tween = gsap.to(ref.nativeElement, {
        x: `${cfg.x}vw`,
        y: `${cfg.y}vh`,
        scale: cfg.scale,
        duration: cfg.duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.6,
      });
      this.tweens.push(tween);
    });
  }

  ngOnDestroy(): void {
    this.tweens.forEach((t) => t.kill());
  }
}
