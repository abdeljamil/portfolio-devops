import {
    animate,
    query,
    style,
    transition,
    trigger
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  animations: [
    trigger('routeAnim', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <app-navbar />

    <div [@routeAnim]="outlet.isActivated">
      <router-outlet #outlet="outlet" />
    </div>

    <footer class="relative z-10 text-center py-8 text-[11px] text-neutral-600
                    border-t border-white/[0.06] tracking-wide">
      Angular · Tailwind ·
      <span class="text-neutral-500">Portfolio DevOps</span>
    </footer>
  `
})
export class AppComponent {}
