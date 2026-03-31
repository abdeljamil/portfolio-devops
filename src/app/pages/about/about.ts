import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  // templateUrl: './about.html',
  template: `
  <main class="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-3xl mx-auto z-10 relative">

    <!-- Titre -->
    <div class="text-green-400 text-xs tracking-[0.2em] uppercase font-mono mb-2">
      // À propos
    </div>
    <h1 class="text-4xl md:text-5xl tracking-tight text-slate-200 mb-10"
        style="font-family: 'Syne', sans-serif; font-weight: 800">
      Qui suis-<span class="text-green-400">je ?</span>
    </h1>

    <!-- Bio -->
    <div class="bg-[#0a1520] border border-white/[0.06] rounded-lg p-6 mb-6">
      <div class="text-green-400 text-xs font-mono tracking-widest uppercase mb-4">
        $ cat bio.txt
      </div>
      <p class="text-slate-300 text-sm leading-8 font-mono">
        Développeur camerounais titulaire d'une licence en informatique,
        je suis actuellement en stage professionnel depuis
        <span class="text-green-400">2 ans et demi</span> —
        une expérience qui m'a permis de grandir considérablement.
      </p>
      <p class="text-slate-300 text-sm leading-8 font-mono mt-4">
        Passionné par l'informatique en général, je me consacre aujourd'hui
        au <span class="text-green-400">DevOps</span> — automatisation,
        déploiement, infrastructure cloud. C'est l'objet de mon apprentissage
        actuel et ce portfolio en est le reflet.
      </p>
    </div>

    <!-- Soft skills -->
    <div class="bg-[#0a1520] border border-white/[0.06] rounded-lg p-6 mb-6">
      <div class="text-green-400 text-xs font-mono tracking-widest uppercase mb-4">
        $ cat soft-skills.json
      </div>
      <div class="flex flex-wrap gap-3">
        @for (skill of softSkills; track skill.label) {
          <div class="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10
                      bg-white/[0.02]">
            <span>{{ skill.icon }}</span>
            <span class="text-slate-300 text-sm font-mono">{{ skill.label }}</span>
          </div>
        }
      </div>
    </div>

    <!-- Langues -->
    <div class="bg-[#0a1520] border border-white/[0.06] rounded-lg p-6 mb-6">
      <div class="text-green-400 text-xs font-mono tracking-widest uppercase mb-4">
        $ cat langues.txt
      </div>
      <div class="space-y-4">
        @for (lang of langues; track lang.nom) {
          <div>
            <div class="flex justify-between font-mono text-xs mb-1">
              <span class="text-slate-300">{{ lang.nom }}</span>
              <span class="text-green-400">{{ lang.niveau }}</span>
            </div>
            <div class="h-[3px] bg-white/5 rounded-full">
              <div class="h-full rounded-full bg-green-400"
                   [style.width]="lang.percent + '%'"
                   [style.background-color]="lang.color">
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Terminal fun -->
    <div class="font-mono text-xs text-slate-600 mt-8">
      <span class="text-green-400">$</span>
      echo "En construction — plus de contenu à venir..."
      <span class="text-green-400 animate-pulse">█</span>
    </div>

  </main>
`
  // styleUrl: './about.css',
})
export class About {
  softSkills = [
    { icon: '🧘', label: 'Calme et posé' },
    { icon: '🔄', label: 'Adaptable' },
    { icon: '🔍', label: 'Curieux' },
    { icon: '💪', label: 'Autonome' },
  ];

  langues = [
    { nom: '🇫🇷 Français', niveau: 'Courant', percent: 95, color: '#00ff88' },
    { nom: '🇬🇧 Anglais', niveau: 'Notions', percent: 35, color: '#00aaff' },
  ];
}
