import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  /** True once the page has scrolled past the reveal threshold. */
  @Input() stuck = false;

  readonly items = ['Home', 'Study', 'Plan', 'Notes'];
  readonly active = signal<string>('Home');
  readonly message = signal<string | null>(null);

  private messageTimer?: ReturnType<typeof setTimeout>;

  select(item: string): void {
    this.active.set(item);
    this.message.set(`${item} works`);

    clearTimeout(this.messageTimer);
    this.messageTimer = setTimeout(() => this.message.set(null), 1500);
  }
}
