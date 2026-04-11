import { Component, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { ThemeService } from '../../../core/services/theme.service'
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4
             bg-black/85 backdrop-blur-md border-b border-white/[0.08]"
    >
      <!-- Logo -->
      <a
        routerLink="/"
        class="shrink-0 font-semibold text-sm md:text-base tracking-tight text-white hover:opacity-80 transition-opacity no-underline"
      >
        P.<span class="text-neutral-500">DEVOPS</span>
      </a>

      <!-- Liens centrés (desktop) -->
      <ul
        class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8 list-none m-0 p-0"
      >
        @for (link of navLinks; track link.path) {
          <li>
            <a
              [routerLink]="link.path"
              routerLinkActive="text-white"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              class="text-[11px] tracking-[0.2em] uppercase transition-colors text-neutral-500 hover:text-white font-medium no-underline"
            >
              {{ link.label }}
            </a>
          </li>
        }
      </ul>

      <!-- Droite : email + GitHub + thème -->
      <div class="flex items-center gap-4 shrink-0">
        <a
          href="mailto:votre@email.com"
          class="hidden sm:flex items-center gap-2 text-[11px] tracking-wide text-neutral-400 hover:text-white transition-colors no-underline"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.6)]"></span>
          votre&#64;email.com
        </a>
        <a
          href="https://github.com/pountounyinyi"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline text-[11px] tracking-[0.15em] uppercase text-neutral-500 hover:text-white transition-colors no-underline"
        >
          GitHub
        </a>
        <app-theme-toggle />
        <button
          class="md:hidden text-neutral-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1"
          type="button"
          (click)="mobileOpen.set(!mobileOpen())"
          aria-label="Menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="
                mobileOpen()
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              "
            />
          </svg>
        </button>
      </div>
    </nav>

    @if (mobileOpen()) {
      <div
        class="fixed top-[57px] left-0 right-0 z-40 bg-neutral-950 border-b border-white/[0.08] md:hidden"
      >
        <ul class="flex flex-col p-4 gap-0 list-none m-0">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-white"
                class="block py-3 px-2 text-neutral-400 text-xs uppercase tracking-widest hover:text-white transition-colors no-underline border-b border-white/[0.06] last:border-0"
                (click)="mobileOpen.set(false)"
              >
                {{ link.label }}
              </a>
            </li>
          }
          <li class="pt-3 px-2">
            <a
              href="https://github.com/pountounyinyi"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs uppercase tracking-widest text-neutral-500 no-underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    }
  `,
})
export class NavbarComponent {
  themeService: ThemeService = inject(ThemeService)
  mobileOpen = signal(false)

  navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/projets', label: 'Projets' },
    { path: '/about', label: 'À propos' },
    { path: '/parcours', label: 'Parcours' },
    { path: '/certifications', label: 'Certifs' },
    { path: '/contact', label: 'Contact' },
  ]
}
