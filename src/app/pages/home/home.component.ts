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
import { TimelineItem } from '../../models/portfolio.models';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent],
  styles: [
    `
      .skill-item {
        opacity: 0;
        transform: translateY(16px);
        animation: skill-card-enter 0.55s ease forwards;
        animation-delay: var(--skill-delay, 0ms);
      }

      .project-item {
        opacity: 0;
        transform: translateX(-12px);
        animation: project-slide-in 0.4s ease forwards;
      }

      @keyframes skill-card-enter {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes project-slide-in {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .hero-area-grid {
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      }
    `,
  ],
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query(
          '.hero-item',
          [
            style({ opacity: 0, transform: 'translateY(24px)' }),
            stagger(70, [
              animate(
                '0.55s ease',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  template: `
    <section
      class="relative z-10 min-h-[min(100vh,900px)] flex flex-col justify-center px-5 md:px-10 pt-24 pb-16 lg:pt-28"
      @heroEnter
    >
      <div
        class="max-w-6xl mx-auto w-full grid grid-cols-1 xl:grid-cols-[200px_minmax(0,1fr)_280px] gap-10 xl:gap-14 items-start"
      >
        <!-- Photo (fichier dans public/ → URL absolue /pountounyinyi.jpg) -->
        <div class="mx-auto w-full max-w-[280px] xl:max-w-none xl:mx-0 xl:pt-2">
          <div
            class="text-[11px] tracking-[0.25em] uppercase text-neutral-600 mb-4 text-center"
          >
            Profil
          </div>
          <div
            class="aspect-square overflow-hidden rounded-full border border-white/[0.12] bg-neutral-950"
          >
            <img
              src="/pountounyinyi.jpg"
              width="400"
              height="400"
              alt="Photo de profil"
              class="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-[filter] duration-500"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <!-- Colonne principale -->
        <div class="relative min-w-0">
          <div
            class="hero-item inline-flex items-center border border-white/15 px-3 py-1.5 mb-8 text-[10px] tracking-[0.2em] uppercase text-neutral-500"
          >
            Disponible pour projets
          </div>

          <h1
            class="hero-item font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-3"
          >
            Bonjour, je suis Abdel-Jamil.
          </h1>
          <p
            class="hero-item text-lg md:text-xl font-semibold text-white/90 mb-6"
          >
            Stagiaire DevOps · Projets personnels &amp; formation continue
          </p>
          <p
            class="hero-item text-base text-neutral-500 leading-relaxed max-w-xl mb-10"
          >
            Je construis ma stack Linux → Docker → AWS → CI/CD, une brique à la
            fois. Ce site reflète ma progression en temps réel : roadmap,
            projets et certifications orientés le monde du cloud et de
            l’automatisation.
          </p>

          <div class="hero-item flex flex-wrap gap-4 mb-10">
            <a
              routerLink="/projets"
              class="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-[11px] font-semibold uppercase tracking-[0.2em] no-underline hover:bg-neutral-200 transition-colors"
            >
              Voir tous les projets
            </a>
            <a
              routerLink="/contact"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/90 text-white text-[11px] font-semibold uppercase tracking-[0.2em] no-underline hover:bg-white/5 transition-colors"
            >
              Me contacter
            </a>
          </div>

          <p class="hero-item text-xs text-neutral-600 font-mono">
            Progression DevOps globale :
            <span class="text-neutral-300">{{ service.globalProgress() }}%</span>
          </p>

          <!-- Projets animés -->
          <div class="hero-item mt-8 pt-8 border-t border-white/[0.08]">
            <div class="text-[11px] tracking-[0.25em] uppercase text-neutral-600 mb-4">
              Projets récents
            </div>
            <div class="space-y-3">
              @for (project of service.projects().slice(0, 3); track project.id; let i = $index) {
                <div
                  class="project-item group p-3 border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
                  [style.animation-delay]="(i * 100) + 'ms'"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-start gap-2 min-w-0">
                      <span class="text-sm mt-0.5">{{ project.icon }}</span>
                      <div class="min-w-0">
                        <div class="text-xs font-semibold text-white group-hover:text-sky-400 transition-colors truncate">
                          {{ project.title }}
                        </div>
                        <div class="text-[10px] text-neutral-600 mt-0.5">
                          @switch(project.status) {
                            @case('done') {
                              <span class="text-emerald-600">✓ Terminé</span>
                            }
                            @case('in-progress') {
                              <span class="text-sky-600">→ En cours</span>
                            }
                            @case('planned') {
                              <span class="text-neutral-600">◌ Prévu</span>
                            }
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div
            class="hero-area-grid absolute bottom-0 left-0 right-0 h-32 -z-10 opacity-60 pointer-events-none hidden sm:block"
            aria-hidden="true"
          ></div>
        </div>

        <!-- Expérience (sidebar) -->
        <aside
          class="xl:border-l xl:border-white/[0.08] xl:pl-8 pt-8 xl:pt-0 border-t border-white/[0.08] xl:border-t-0"
        >
          <div
            class="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-white mb-8"
          >
            <span class="text-base leading-none" aria-hidden="true">💼</span>
            Parcours
          </div>
          <ul class="list-none m-0 p-0 space-y-8">
            @for (item of experiencePreview(); track item.id) {
              <li class="relative pl-0">
                <div class="flex items-start justify-between gap-2">
                  <span
                    class="font-semibold text-white text-sm leading-snug"
                    >{{ item.company }}</span
                  >
                  @if (item.active) {
                    <span
                      class="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                      title="En cours"
                    ></span>
                  }
                </div>
                <div class="text-neutral-500 text-sm mt-1">{{ item.title }}</div>
                <div class="text-neutral-600 text-xs mt-1.5 font-mono">
                  {{ item.date }}
                </div>
              </li>
            }
          </ul>
          <a
            routerLink="/parcours"
            class="inline-block mt-10 text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors no-underline"
          >
            Voir tout le parcours →
          </a>
        </aside>
      </div>
    </section>

    <!-- Stack -->
    <section
      class="relative z-10 px-5 md:px-10 py-20 max-w-6xl mx-auto border-t border-white/[0.06]"
    >
      <div class="mb-12">
        <div
          class="text-[11px] tracking-[0.25em] uppercase text-neutral-600 mb-3"
        >
          Stack &amp; progression
        </div>
        <h2
          class="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
        >
          Roadmap <span class="text-neutral-400">DevOps</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
        @for (skill of service.skills(); track skill.id; let i = $index) {
          <div
            class="skill-item bg-neutral-950 p-6 hover:bg-neutral-900/80 transition-colors"
            [style.--skill-delay.ms]="i * 80"
          >
            <div class="flex items-center justify-between mb-3 gap-2">
              <div class="font-semibold text-white text-sm">
                {{ skill.icon }} {{ skill.name }}
              </div>
              <span
                class="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white/10 text-neutral-400"
              >
                {{ getStatusLabel(skill.status) }}
              </span>
            </div>
            <p class="text-neutral-500 text-xs leading-relaxed mb-4 min-h-[3rem]">
              {{ skill.description }}
            </p>
            <app-progress-bar
              [value]="skill.progress"
              [color]="skill.accentColor"
            />
            <div class="flex flex-wrap gap-1 mt-4">
              @for (tag of skill.tags; track tag) {
                <span
                  class="text-[10px] px-1.5 py-0.5 text-neutral-600 border border-white/[0.06]"
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

  /** Aperçu type « colonne expérience » : actifs en premier, puis les autres. */
  experiencePreview(): TimelineItem[] {
    const items = [...this.service.timeline()];
    items.sort((a, b) => {
      if (a.active === b.active) return 0;
      return a.active ? -1 : 1;
    });
    return items.slice(0, 6);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      mastered: 'Maîtrisé',
      learning: 'En cours',
      coming: 'À venir',
      planned: 'Futur',
    };
    return map[status] ?? status;
  }
}
