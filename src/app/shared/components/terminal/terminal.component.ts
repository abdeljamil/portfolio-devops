import { Component, inject, OnInit } from '@angular/core';
import { DevopsProgressService } from '../../../core/services/devops-progress.service';
import { DevOpsSkill } from '../../../models/portfolio.models';

@Component({
  selector: 'app-terminal',
  standalone: true,
  template: `
    <div class="w-full max-w-sm rounded-lg overflow-hidden border border-green-400/20
                bg-[#0a1520]"
         style="box-shadow: 0 32px 80px rgba(0,0,0,0.5)">
      <!-- Title bar -->
      <div class="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-green-400/10">
        <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-green-400"></span>
        <span class="ml-auto text-slate-500 text-xs font-mono">devops-progress.sh</span>
      </div>

      <!-- Body -->
      <div class="p-4 text-xs font-mono leading-7">
        <div>
          <span class="text-slate-500">$ </span>
          <span class="text-green-400">{{ typedCommand }}</span>
          @if (!commandDone) {
            <span class="animate-pulse text-green-400">█</span>
          }
        </div>

        @if (commandDone) {
          <div class="text-slate-600">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

          @for (skill of skills; track skill.id) {
            <div class="flex items-center gap-1">
              <span class="text-blue-400">▶</span>
              <span class="text-slate-300 w-24 inline-block">{{ skill.name }}</span>
              <span [style.color]="skill.accentColor">
                {{ getBar(skill.progress) }} {{ skill.progress }}%
              </span>
            </div>
          }

          <div class="text-slate-600">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

          <div>
            <span class="text-slate-500">$ </span>
            <span class="text-green-400">git log --oneline -3</span>
          </div>
          <div class="text-slate-500">a3f1c2e feat: Docker multi-stage</div>
          <div class="text-slate-500">7b20d91 fix: nginx reverse proxy</div>
          <div class="text-slate-500">c8e4a12 feat: AWS S3 hosting</div>

          <div>
            <span class="text-slate-500">$ </span>
            <span class="text-green-400 animate-pulse">█</span>
          </div>
        }
      </div>
    </div>
  `
})
export class TerminalComponent implements OnInit {
  private devopsService: DevopsProgressService = inject(DevopsProgressService);

  typedCommand = '';
  commandDone = false;
  skills: DevOpsSkill[] = [];

  private fullCommand = './check-progress.sh';

  ngOnInit(): void {
    this.skills = this.devopsService.skills();
    this.typeCommand();
  }

  typeCommand(): void {
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.fullCommand.length) {
        this.typedCommand += this.fullCommand[i++];
      } else {
        clearInterval(interval);
        setTimeout(() => { this.commandDone = true; }, 300);
      }
    }, 60);
  }

  getBar(progress: number): string {
    const filled = Math.round(progress / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }
}
