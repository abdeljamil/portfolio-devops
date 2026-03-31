import { Component, inject } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query
} from '@angular/animations';
import { DevopsProgressService } from '../../core/services/devops-progress.service';
import { TimelineItem } from '../../models/portfolio.models';

@Component({
  selector: 'app-parcours',
  standalone: true,
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        query('.tl-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(150, [
            animate('0.5s ease', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <main class="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-3xl mx-auto z-10 relative"
          @pageEnter>

      <div class="mb-12">
        <div class="text-green-400 text-xs tracking-[0.2em] uppercase font-mono mb-2">
          // Expérience
        </div>
        <h1 class="text-4xl md:text-5xl tracking-tight text-slate-200"
            style="font-family: 'Syne', sans-serif; font-weight: 800">
          Mon <span class="text-green-400">parcours</span>
        </h1>
      </div>

      <!-- Timeline -->
      <div class="relative pl-8">
        <div class="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-green-400 to-transparent"></div>

        @for (item of service.timeline(); track item.id) {
          <div class="tl-item relative mb-12">

            <!-- Dot -->
            <div class="absolute -left-[34px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-green-400"
                 [class.bg-green-400]="item.active"
                 [class.bg-transparent]="!item.active"
                 [style.box-shadow]="item.active ? '0 0 12px rgba(0,255,136,0.6)' : 'none'">
            </div>

            <!-- Date + type -->
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-green-400 text-xs font-mono tracking-widest">{{ item.date }}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded border"
                    [style.color]="getTypeColor(item.type)"
                    [style.border-color]="getTypeColor(item.type) + '40'">
                {{ getTypeLabel(item.type) }}
              </span>
              @if (item.active) {
                <span class="flex items-center gap-1 text-[10px] font-mono text-green-400">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  En cours
                </span>
              }
            </div>

            <h3 class="text-xl text-slate-200 mb-1"
                style="font-family: 'Syne', sans-serif; font-weight: 700">
              {{ item.title }}
            </h3>
            <div class="text-blue-400 text-sm font-mono mb-3">{{ item.company }}</div>
            <p class="text-slate-500 text-sm leading-relaxed mb-4">{{ item.description }}</p>

            <div class="flex flex-wrap gap-2">
              @for (tag of item.tags; track tag) {
                <span class="text-[10px] font-mono px-2 py-0.5 rounded
                             bg-blue-400/5 border border-blue-400/20 text-blue-400">
                  {{ tag }}
                </span>
              }
            </div>
          </div>
        }
      </div>

      <!-- Next step -->
      <div class="mt-8 p-4 border border-green-400/10 rounded-lg bg-[#0a1520]">
        <div class="font-mono text-xs text-slate-500 mb-2">
          <span class="text-green-400">$</span> git log --future
        </div>
        <p class="font-mono text-sm text-slate-300">
          🎯 Prochaine étape :
          <span class="text-green-400">Certification AWS Cloud Practitioner</span>
        </p>
        <p class="font-mono text-xs text-slate-500 mt-1">
          Puis AWS Solutions Architect → Kubernetes → Pipeline CI/CD production
        </p>
      </div>
    </main>
  `
})
export class ParcoursComponent {
  service: DevopsProgressService = inject(DevopsProgressService);

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      stage: '🏢 Stage',
      formation: '📚 Formation',
      certification: '🎓 Certif'
    };
    return map[type] ?? type;
  }

  getTypeColor(type: string): string {
    const map: Record<string, string> = {
      stage: '#00ff88',
      formation: '#00aaff',
      certification: '#ff6b35'
    };
    return map[type] ?? '#4a6b7a';
  }
}
