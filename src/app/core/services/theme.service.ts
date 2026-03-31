import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme = signal<Theme>('dark');

  readonly theme = this._theme.asReadonly();

  isDark(): boolean {
    return this._theme() === 'dark';
  }

  constructor() {
    // Load saved theme
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    if (saved) this._theme.set(saved);

    effect(() => {
      const theme = this._theme();
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
      }
      localStorage.setItem('portfolio-theme', theme);
    });
  }

  toggle(): void {
    this._theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
}
