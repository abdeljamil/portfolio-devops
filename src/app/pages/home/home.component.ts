import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DevopsProgressService } from '../../core/services/devops-progress.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent],
  styles: [
    `
      .profile-ring {
        position: relative;
        width: 280px;
        height: 280px;
      }

      /* Anneau tournant conic-gradient */
      .profile-ring::before {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        background: conic-gradient(
          #00ff88 0deg,
          #00ff88 110deg,
          #00cc6a 110deg,
          transparent 160deg,
          transparent 200deg,
          #00ff88 200deg,
          #00ff88 310deg,
          transparent 310deg
        );
        animation: ring-spin 3s linear infinite;
        z-index: 1;
      }

      /* Second anneau inverse, plus léger */
      .profile-ring::after {
        content: '';
        position: absolute;
        inset: -9px;
        border-radius: 50%;
        background: conic-gradient(
          transparent 0deg,
          rgba(0, 255, 136, 0.15) 90deg,
          transparent 180deg,
          rgba(0, 255, 136, 0.08) 270deg,
          transparent 360deg
        );
        animation: ring-spin 6s linear infinite reverse;
        z-index: 0;
      }

      @keyframes ring-spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Wrapper photo — masque le bg derrière le ring */
      .profile-img-mask {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        overflow: hidden;
        z-index: 2;
        border: 4px solid #050a0e;
      }

      .profile-img-mask img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        display: block;
        transition: transform 0.5s ease;
      }

      .profile-ring:hover .profile-img-mask img {
        transform: scale(1.04);
      }

      /* Halo pulsant derrière */
      .profile-halo {
        position: absolute;
        inset: -24px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(0, 255, 136, 0.1) 0%,
          transparent 65%
        );
        animation: halo-pulse 2.5s ease-in-out infinite;
        z-index: 0;
      }

      @keyframes halo-pulse {
        0%,
        100% {
          opacity: 0.5;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.08);
        }
      }

      /* Badge "Disponible" */
      .avail-badge {
        position: absolute;
        bottom: 4px;
        right: 4px;
        z-index: 10;
        background: #050a0e;
        border: 1px solid rgba(0, 255, 136, 0.6);
        border-radius: 20px;
        padding: 4px 10px;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 10px;
        font-family: 'JetBrains Mono', monospace;
        color: #00ff88;
        box-shadow: 0 0 12px rgba(0, 255, 136, 0.2);
      }

      .avail-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #00ff88;
        animation: dot-blink 1.5s ease-in-out infinite;
      }

      @keyframes dot-blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      /* Coins HUD */
      .hud-corner {
        position: absolute;
        width: 14px;
        height: 14px;
        border-color: rgba(0, 255, 136, 0.5);
        border-style: solid;
      }
      .hud-tl {
        top: -14px;
        left: -14px;
        border-width: 2px 0 0 2px;
      }
      .hud-tr {
        top: -14px;
        right: -14px;
        border-width: 2px 2px 0 0;
      }
      .hud-bl {
        bottom: -14px;
        left: -14px;
        border-width: 0 0 2px 2px;
      }
      .hud-br {
        bottom: -14px;
        right: -14px;
        border-width: 0 2px 2px 0;
      }

      .skill-item {
        opacity: 0;
        transform: translateY(20px);
        animation: skill-card-enter 0.5s ease forwards;
        animation-delay: var(--skill-delay, 0ms);
      }

      @keyframes skill-card-enter {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query(
          '.hero-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(80, [
              animate(
                '0.6s ease',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('photoEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'scale(1)' }),
        ),
      ]),
    ]),
  ],
  template: `
    <!-- ── HERO ── -->
    <section
      class="relative min-h-screen flex items-center px-6 md:px-10 pt-28 pb-16 z-10"
      @heroEnter
    >
      <div
        class="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
      >
        <!-- LEFT: contenu texte -->
        <div class="flex-1 order-2 lg:order-1">
          <div class="hero-item font-mono text-xs mb-4">
            <!-- <span class="text-blue-400">~/portfolio</span> -->
            <span class="text-slate-500"> ~/abdel-jamil </span>
            <span class="text-slate-500"> $ </span>
            <span class="text-green-400">whoami</span>
          </div>

          <h1
            class="hero-item leading-[1.05] tracking-tight mb-2"
            style="font-family: 'Syne', sans-serif; font-weight: 800"
          >
            <div class="text-4xl md:text-[3.5rem] text-slate-200">
              Ingénieur en
            </div>
            <div class="text-4xl md:text-[3.5rem] text-green-400">
              devenir DevOps<span class="animate-pulse">_</span>
            </div>
          </h1>

          <p
            class="hero-item font-mono text-sm text-slate-500 leading-7 mt-6 mb-8 max-w-md
                     border-l-2 border-green-400 pl-4"
          >
            Stagiaire passionné, je construis ma stack DevOps brique par brique.
            Linux → Docker → AWS → CI/CD. Ce portfolio évolue avec ma
            progression en temps réel.
          </p>

          <!-- Tags -->
          <div class="hero-item flex flex-wrap gap-2 mb-8">
            @for (tag of heroTags; track tag.label) {
              <span
                class="text-xs font-mono px-3 py-1 rounded border tracking-widest uppercase"
                [style.color]="tag.color"
                [style.border-color]="tag.color + '50'"
                [style.background-color]="tag.color + '0D'"
              >
                {{ tag.label }}
              </span>
            }
          </div>

          <!-- CTAs -->
          <div class="hero-item flex flex-wrap gap-4 mb-6">
            <a
              routerLink="/projets"
              class="font-mono text-xs uppercase tracking-widest px-6 py-3 rounded
                      bg-green-400 text-[#050a0e] font-bold no-underline cursor-pointer
                      hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,255,136,0.3)]
                      transition-all duration-200"
            >
              Voir mes projets
            </a>
            <a
              routerLink="/contact"
              class="font-mono text-xs uppercase tracking-widest px-6 py-3 rounded
                      border border-white/10 text-slate-300 no-underline cursor-pointer
                      hover:border-green-400/50 hover:text-green-400
                      transition-all duration-200"
            >
              Me contacter
            </a>
          </div>

          <!-- Progression globale -->
          <div class="hero-item font-mono text-xs text-slate-500">
            <span class="text-slate-600">$</span>
            Progression DevOps :
            <span class="text-green-400 font-bold"
              >{{ service.globalProgress() }}%</span
            >
            — <span class="text-slate-600">formation en cours</span>
          </div>
        </div>

        <!-- RIGHT: Photo de profil -->
        <div
          class="order-1 lg:order-2 flex-shrink-0 flex items-center justify-center"
          @photoEnter
        >
          <div class="relative" style="width: 300px; height: 300px;">
            <!-- Halo lumineux derrière tout -->
            <div class="profile-halo"></div>

            <!-- Anneau animé + photo -->
            <div class="profile-ring">
              <div class="profile-img-mask">
                <img
                  src="pountounyinyi.jpg"
                  alt="Pountounyinyi — Développeur DevOps"
                  draggable="false"
                />
              </div>
            </div>

            <!-- Badge disponible -->
            <div class="avail-badge">
              <span class="avail-dot"></span>
              Disponible
            </div>

            <!-- Coins HUD -->
            <div class="hud-corner hud-tl"></div>
            <div class="hud-corner hud-tr"></div>
            <div class="hud-corner hud-bl"></div>
            <div class="hud-corner hud-br"></div>

            <!-- Texte latéral décoratif -->
            <div
              class="absolute top-1/2 -translate-y-1/2 -left-5 font-mono text-[9px]
                         text-green-400/30 hidden xl:block select-none"
              style="writing-mode: vertical-rl; letter-spacing: 0.18em;"
            >
              DEV · OPS · STAGE
            </div>
            <div
              class="absolute top-1/2 -translate-y-1/2 -right-5 font-mono text-[9px]
                         text-green-400/30 hidden xl:block select-none"
              style="writing-mode: vertical-rl; letter-spacing: 0.18em;"
            >
              LINUX · DOCKER · AWS
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── ROADMAP DEVOPS ── -->
    <section class="relative z-10 px-6 md:px-10 py-20 max-w-6xl mx-auto">
      <div class="mb-12">
        <div
          class="text-green-400 text-xs tracking-[0.2em] uppercase font-mono mb-2"
        >
          // Stack & Progression
        </div>
        <h2
          class="text-4xl md:text-5xl tracking-tight text-slate-200"
          style="font-family: 'Syne', sans-serif; font-weight: 800"
        >
          Ma roadmap <span class="text-green-400">DevOps</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (skill of service.skills(); track skill.id; let i = $index) {
          <div
            class="skill-item bg-[#0a1520] rounded-lg p-5 border border-white/[0.06]
                       hover:-translate-y-1 transition-all duration-300 cursor-default"
            [style.--skill-delay.ms]="i * 300"
            [style.border-top]="'2px solid ' + skill.accentColor"
          >
            <div class="flex items-center justify-between mb-3">
              <div
                class="font-bold text-slate-200"
                style="font-family: 'Syne', sans-serif"
              >
                {{ skill.icon }} {{ skill.name }}
              </div>
              <span
                class="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border"
                [style.color]="getStatusColor(skill.status)"
                [style.border-color]="getStatusColor(skill.status) + '50'"
              >
                {{ getStatusLabel(skill.status) }}
              </span>
            </div>

            <p class="text-slate-500 text-xs leading-relaxed mb-4">
              {{ skill.description }}
            </p>

            <app-progress-bar
              [value]="skill.progress"
              [color]="skill.accentColor"
            />

            <div class="flex flex-wrap gap-1 mt-3">
              @for (tag of skill.tags; track tag) {
                <span
                  class="text-[10px] font-mono px-1.5 py-0.5 rounded
                             bg-white/[0.03] border border-white/[0.06] text-slate-500"
                >
                  {{ tag }}
                </span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class HomeComponent {
  service: DevopsProgressService = inject(DevopsProgressService);

  heroTags = [
    { label: 'Angular 21', color: '#dd0031' },
    { label: 'Linux', color: '#00ff88' },
    { label: 'Docker 🔥', color: '#ff6b35' },
    { label: 'AWS en cours', color: '#ff6b35' },
    { label: 'CI/CD à venir', color: '#4a6b7a' },
    { label: 'Tailwind CSS', color: '#06b6d4' },
  ];

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      mastered: 'Maîtrisé',
      learning: 'En cours',
      coming: 'À venir',
      planned: 'Futur',
    };
    return map[status] ?? status;
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      mastered: '#00ff88',
      learning: '#ff6b35',
      coming: '#ff3b5c',
      planned: '#4a6b7a',
    };
    return map[status] ?? '#4a6b7a';
  }
}
