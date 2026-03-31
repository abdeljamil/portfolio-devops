import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      (click)="toggle()"
      class="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10
             text-slate-400 hover:text-green-400 hover:border-green-400/50
             transition-all duration-200 bg-transparent cursor-pointer"
      [attr.aria-label]="themeService.isDark() ? 'Mode clair' : 'Mode sombre'">
      @if (themeService.isDark()) {
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
      } @else {
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      }
    </button>
  `
})
export class ThemeToggleComponent {
  themeService: ThemeService = inject(ThemeService);

  toggle(): void {
    this.themeService.toggle();
  }
}
