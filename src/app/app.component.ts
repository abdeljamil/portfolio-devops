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
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          animate('0.35s ease', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <app-navbar />

    <main [@routeAnimations]="getRouteState(outlet)">
      <router-outlet #outlet="outlet" />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 text-center py-6 text-xs font-mono text-terminal-muted
                    border-t border-terminal-green/10">
      Construit avec
      <span class="text-terminal-green">Angular 20</span> ·
      Déployé sur <span class="text-terminal-green">AWS</span> ·
      Pipeline CI/CD <span class="text-terminal-green">en cours</span>
      <br>
      <span class="text-terminal-muted/50">git commit -m "feat: keep learning"</span>
    </footer>
  `
})
export class AppComponent {
  getRouteState(outlet: any) {
    return outlet?.activatedRouteData?.['animation'] ?? outlet?.isActivated;
  }
}
