import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger
} from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { DevopsProgressService } from '../../core/services/devops-progress.service';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projets',
  standalone: true,
  animations: [
    trigger('gridEnter', [
      transition(':enter', [
        query('.proj-item', [
          style({ opacity: 0, transform: 'translateY(24px)' }),
          stagger(100, [
            animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <main class="min-h-screen px-5 md:px-10 pt-24 pb-20 max-w-6xl mx-auto z-10 relative"
          @gridEnter>

      <div class="mb-12">
        <div class="text-[11px] tracking-[0.25em] uppercase text-neutral-600 mb-3">
          Réalisations
        </div>
        <h1 class="font-display text-4xl md:text-5xl tracking-tight text-white font-bold">
          Mes <span class="text-neutral-400">projets</span>
        </h1>
      </div>

      <!-- Filters -->
      <div class="flex gap-2 mb-8 font-mono text-xs flex-wrap">
        @for (f of filters; track f.value) {
          <button
            (click)="activeFilter.set(f.value)"
            class="px-4 py-1.5 border transition-all duration-200 cursor-pointer bg-transparent"
            [style.border-color]="activeFilter() === f.value ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)'"
            [style.color]="activeFilter() === f.value ? '#fafafa' : '#737373'">
            {{ f.label }}
          </button>
        }
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        @for (project of filteredProjects(); track project.id) {
          <div class="proj-item bg-neutral-950 border border-white/[0.08] p-6
                       flex flex-col gap-3 transition-all duration-300
                       hover:-translate-y-1 hover:border-white/20
                       hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
               [style.opacity]="project.status === 'planned' ? '0.6' : '1'">

            <div class="flex items-start justify-between">
              <span class="text-3xl">{{ project.icon }}</span>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded border"
                      [style.color]="getStatusColor(project.status)"
                      [style.border-color]="getStatusColor(project.status) + '40'">
                  {{ getStatusLabel(project.status) }}
                </span>
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank"
                     class="text-[10px] font-mono text-neutral-500 border border-white/10 px-2 py-0.5
                            hover:text-white hover:border-white/30 transition-all no-underline">
                    GitHub
                  </a>
                }
                @if (project.demoUrl) {
                  <a [href]="project.demoUrl" target="_blank"
                     class="text-[10px] font-mono text-neutral-500 border border-white/10 px-2 py-0.5
                            hover:text-white hover:border-white/30 transition-all no-underline">
                    Demo
                  </a>
                }
              </div>
            </div>

            <h3 class="text-lg text-white font-display font-bold">
              {{ project.title }}
            </h3>
            <p class="text-neutral-500 text-sm leading-relaxed flex-1">{{ project.description }}</p>

            <div class="flex flex-wrap gap-1.5 mt-auto">
              @for (tech of project.stack; track tech) {
                <span class="text-[10px] font-mono px-2 py-0.5
                             bg-white/[0.04] border border-white/[0.08] text-neutral-400">
                  {{ tech }}
                </span>
              }
            </div>
          </div>
        }
      </div>

      <div class="mt-10 font-mono text-xs text-neutral-600">
        Plus de projets à venir…
      </div>
    </main>
  `
})
export class ProjetsComponent {
  service: DevopsProgressService = inject(DevopsProgressService);
  activeFilter = signal<string>('all');

  filters = [
    { value: 'all', label: 'Tous' },
    { value: 'done', label: '✅ Terminés' },
    { value: 'in-progress', label: '🔥 En cours' },
    { value: 'planned', label: '⏳ Prévus' },
  ];

  filteredProjects(): Project[] {
    const f = this.activeFilter();
    const all = this.service.projects();
    if (f === 'all') return all;
    return all.filter((p: Project) => p.status === f);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      done: '✅ Terminé',
      'in-progress': '🔥 En cours',
      planned: '⏳ Prévu'
    };
    return map[status] ?? status;
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      done: '#38bdf8',
      'in-progress': '#fb923c',
      planned: '#737373'
    };
    return map[status] ?? '#737373';
  }
}
