import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DevopsProgressService } from '../../core/services/devops-progress.service';
import { TimelineItem } from '../../models/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main
      class="min-h-screen px-5 md:px-10 pt-24 pb-20 max-w-6xl mx-auto z-10 relative"
    >
      <div
        class="grid grid-cols-1 xl:grid-cols-[200px_minmax(0,1fr)_280px] gap-10 xl:gap-14 items-start"
      >
        <!-- Colonne gauche : à propos + photo + méta -->
        <aside class="mx-auto w-full max-w-[220px] xl:max-w-none xl:mx-0">
          <div
            class="flex items-center justify-center gap-2 text-[11px] tracking-[0.25em] uppercase text-white mb-6"
          >
            <span aria-hidden="true">👤</span>
            À propos
          </div>
          <div
            class="aspect-square overflow-hidden rounded-full border border-white/[0.12] bg-neutral-950 mb-6"
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
          <dl class="space-y-3 text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-mono">
            <div>
              <dt class="text-neutral-600 mb-0.5">Localisation</dt>
              <dd class="text-neutral-300 normal-case tracking-normal text-xs">
                Cameroun
              </dd>
            </div>
            <div>
              <dt class="text-neutral-600 mb-0.5">Rôle</dt>
              <dd class="text-neutral-300 normal-case tracking-normal text-xs">
                Stagiaire DevOps / Développeur
              </dd>
            </div>
            <div>
              <dt class="text-neutral-600 mb-0.5">Parcours</dt>
              <dd class="text-neutral-300 normal-case tracking-normal text-xs">
                Licence info · Formation continue
              </dd>
            </div>
          </dl>
        </aside>

        <!-- Centre : titre + bio -->
        <div class="min-w-0">
          <h1
            class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            Construire une stack DevOps solide, un commit à la fois.
          </h1>
          <div class="space-y-4 text-neutral-500 text-sm leading-relaxed max-w-xl">
            <p>
              Développeur camerounais titulaire d'une licence en informatique, je
              suis en stage professionnel depuis
              <span class="text-neutral-200">plus de deux ans</span> — une
              expérience qui m'a permis de progresser sur des projets concrets.
            </p>
            <p>
              Aujourd'hui je me concentre sur le
              <span class="text-neutral-200">DevOps</span> : Linux, Docker, AWS,
              CI/CD et automatisation. Ce portfolio reflète cette progression en
              direct.
            </p>
            <p class="text-xs text-neutral-600 font-mono pt-2">
              Stack d'apprentissage : Angular, TypeScript, Linux, Docker, AWS…
            </p>
          </div>

          <div class="mt-10 border border-white/[0.08] p-5 bg-neutral-950/80">
            <div
              class="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-4"
            >
              Soft skills
            </div>
            <div class="flex flex-wrap gap-2">
              @for (skill of softSkills; track skill.label) {
                <span
                  class="text-xs text-neutral-400 px-3 py-1.5 border border-white/[0.08]"
                >
                  {{ skill.icon }} {{ skill.label }}
                </span>
              }
            </div>
          </div>

          <div class="mt-6 border border-white/[0.08] p-5 bg-neutral-950/80">
            <div
              class="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-4"
            >
              Langues
            </div>
            <div class="space-y-4">
              @for (lang of langues; track lang.nom) {
                <div>
                  <div
                    class="flex justify-between text-xs text-neutral-400 mb-1.5"
                  >
                    <span>{{ lang.nom }}</span>
                    <span class="text-neutral-500">{{ lang.niveau }}</span>
                  </div>
                  <div class="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full bg-sky-500/80"
                      [style.width]="lang.percent + '%'"
                    ></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Droite : expérience -->
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
              <li>
                <div class="flex items-start justify-between gap-2">
                  <span class="font-semibold text-white text-sm leading-snug">{{
                    item.company
                  }}</span>
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
            Voir tout →
          </a>
        </aside>
      </div>
    </main>
  `,
})
export class About {
  private service = inject(DevopsProgressService);

  softSkills = [
    { icon: '🧘', label: 'Calme et posé' },
    { icon: '🔄', label: 'Adaptable' },
    { icon: '🔍', label: 'Curieux' },
    { icon: '💪', label: 'Autonome' },
  ];

  langues = [
    { nom: 'Français', niveau: 'Courant', percent: 95 },
    { nom: 'Anglais', niveau: 'Notions', percent: 35 },
  ];

  experiencePreview(): TimelineItem[] {
    const items = [...this.service.timeline()];
    items.sort((a, b) => {
      if (a.active === b.active) return 0;
      return a.active ? -1 : 1;
    });
    return items.slice(0, 6);
  }
}
