import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-time-slider',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './time-slider.component.html',
  styleUrl: './time-slider.component.scss',
})
export class TimeSliderComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  onSlide(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.theme.setMinute(value);
  }
}
