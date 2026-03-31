import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {
  trigger,
  transition,
  style,
  animate,
  query
} from '@angular/animations';

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

    <footer class="relative z-10 text-center py-6 text-xs font-mono text-slate-600
                    border-t border-white/5">
      Construit avec
      <span class="text-green-400">Angular 21</span> ·
      Déployé sur <span class="text-green-400">AWS</span> ·
      Pipeline CI/CD <span class="text-green-400">en cours</span>
      <br>
      <span class="text-slate-700">git commit -m "feat: keep learning"</span>
    </footer>
  `
})
export class AppComponent {}
