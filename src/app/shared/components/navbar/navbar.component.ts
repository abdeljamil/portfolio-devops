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
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4
                bg-[#050a0e]/90 backdrop-blur-md border-b border-green-400/10"
    >
      <!-- Logo -->
      <a
        routerLink="/"
        class="font-black text-lg tracking-tight text-green-400 hover:opacity-80 transition-opacity"
        style="font-family: 'Syne', sans-serif"
      >
        dev<span class="text-slate-300">.</span>ops<span
          class="text-green-400 animate-pulse"
          >_</span
        >
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-8 list-none m-0 p-0">
        @for (link of navLinks; track link.path) {
          <li>
            <a
              [routerLink]="link.path"
              routerLinkActive="text-green-400"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              class="text-xs tracking-widest uppercase transition-colors
                      hover:text-green-400 font-mono no-underline"
            >
              {{ link.label }}
            </a>
          </li>
        }
      </ul>

      <!-- Right -->
      <div class="flex items-center gap-3">
        <div
          class="hidden sm:flex items-center gap-2 text-green-400 border border-green-400/40
                    px-3 py-1 rounded-full text-xs font-mono"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
          ></span>
          En stage · DevOps
        </div>
        <app-theme-toggle />
        <!-- Mobile burger -->
        <button
          class="md:hidden text-slate-400 hover:text-green-400 transition-colors bg-transparent border-none cursor-pointer"
          (click)="mobileOpen.set(!mobileOpen())"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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

    <!-- Mobile menu -->
    @if (mobileOpen()) {
      <div
        class="fixed top-[65px] left-0 right-0 z-40 bg-[#0a1520] border-b border-green-400/10 md:hidden"
      >
        <ul class="flex flex-col p-4 gap-1 list-none m-0">
          @for (link of navLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-green-400"
                class="block py-2 px-4 text-slate-400 text-sm hover:text-green-400
                        transition-colors rounded no-underline font-mono"
                (click)="mobileOpen.set(false)"
              >
                {{ link.label }}
              </a>
            </li>
          }
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
      { path: '/about', label: 'À propos' },
      { path: '/parcours', label: 'Parcours' },
      { path: '/projets', label: 'Projets' },
      { path: '/certifications', label: 'Certifications' },
      { path: '/contact', label: 'Contact' },
  ]
}
