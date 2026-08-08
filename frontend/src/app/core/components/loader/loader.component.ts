import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements AfterViewInit, OnDestroy {
  /** Minimum time the loader stays visible, in ms. */
  @Input() minDuration = 1300;
  @Output() finished = new EventEmitter<void>();

  protected readonly sloganWords = ['From', 'asa', 'to', 'yoru.'];

  @ViewChild('root') root!: ElementRef<HTMLDivElement>;
  @ViewChild('blob') blob!: ElementRef<HTMLDivElement>;
  @ViewChildren('word') words!: QueryList<ElementRef<HTMLSpanElement>>;

  private morphTl?: gsap.core.Timeline;
  private exitDelay?: gsap.core.Tween;

  ngAfterViewInit(): void {
    this.morphTl = gsap
      .timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.8 } })
      .to(this.blob.nativeElement, {
        borderRadius: '60% 40% 35% 65% / 45% 55% 42% 58%',
        rotate: 30,
        scale: 1.12,
        x: 10,
        y: -8,
      })
      .to(this.blob.nativeElement, {
        borderRadius: '32% 68% 62% 38% / 62% 38% 64% 36%',
        rotate: -20,
        scale: 0.9,
        x: -12,
        y: 10,
      })
      .to(this.blob.nativeElement, {
        borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%',
        rotate: 0,
        scale: 1,
        x: 0,
        y: 0,
      });

    gsap.from(
      this.words.map((w) => w.nativeElement),
      { opacity: 0, y: 10, duration: 0.6, stagger: 0.09, delay: 0.35, ease: 'power2.out' },
    );

    this.exitDelay = gsap.delayedCall(this.minDuration / 1000, () => {
      gsap.to(this.root.nativeElement, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => this.finished.emit(),
      });
    });
  }

  ngOnDestroy(): void {
    this.morphTl?.kill();
    this.exitDelay?.kill();
  }
}
