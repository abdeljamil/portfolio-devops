import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, computed, inject, signal } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

interface Certification {
  id: string
  title: string
  organism: string
  date: string
  certNumber: string
  icon: string
  accentColor: string
  tags: string[]
  pdfUrl?: string
  category: 'devops' | 'frontend' | 'backend'
  learned?: string
  linkedProject?: {
    name: string
    url: string
  }
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        query(
          '.cert-card',
          [
            style({
              opacity: 0,
              transform: 'translateY(30px)',
            }),
            stagger(150, [
              animate(
                '0.5s ease',
                style({
                  opacity: 1,
                  transform: 'translateY(0)',
                }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('modalEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('0.2s ease', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('0.15s ease', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
  template: `
    <main
      class="min-h-screen px-6 md:px-10 pt-28 pb-20 max-w-4xl mx-auto z-10 relative"
      @pageEnter
    >
      <!-- Header -->
      <div class="mb-12">
        <div
          class="text-green-400 text-xs tracking-[0.2em] uppercase font-mono mb-2"
        >
          // Certifications
        </div>
        <h1
          class="text-4xl md:text-5xl tracking-tight text-slate-200"
          style="font-family: 'Syne', sans-serif; font-weight: 800"
        >
          Mes
          <span class="text-green-400">certifications</span>
        </h1>
        <p class="text-slate-500 text-sm font-mono mt-3">
          {{ certifications.length }} certification(s) obtenue(s) en ligne
        </p>
      </div>

      <!-- ── GROUPE DEVOPS ── -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🛠️</span>
          <h2 class="text-xl text-slate-200 font-mono font-bold">
            DevOps &
            <span class="text-green-400">Cloud</span>
          </h2>
          <div class="flex-1 h-px bg-green-400/10 ml-2"></div>
          <span class="text-xs font-mono text-slate-500 ml-2">
            {{ devopsCerts().length }} certif(s)
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (cert of devopsCerts(); track cert.id) {
            <div
              class="cert-card group relative p-6 rounded-xl border
                        bg-[#0a1520] transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              [style.border-color]="cert.accentColor + '30'"
              (click)="openPdf(cert)"
            >
              <div
                class="absolute top-0 left-6 right-6 h-px rounded-full"
                [style.background]="
                  'linear-gradient(90deg, ' +
                  cert.accentColor +
                  ', transparent)'
                "
              ></div>

              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{{ cert.icon }}</span>
                  <div>
                    <div class="text-xs font-mono text-slate-500">
                      Délivré par
                    </div>
                    <div
                      class="text-sm font-mono font-bold"
                      [style.color]="cert.accentColor"
                    >
                      {{ cert.organism }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-mono"
                  [style.color]="cert.accentColor"
                  [style.border-color]="cert.accentColor + '40'"
                >
                  <span>✓</span><span>Vérifié</span>
                </div>
              </div>

              <h3
                class="text-lg text-slate-200 mb-3 leading-snug"
                style="font-family: 'Syne', sans-serif; font-weight: 700"
              >
                {{ cert.title }}
              </h3>

              <div class="flex flex-col gap-1 mb-4">
                <div
                  class="flex items-center gap-2 text-xs font-mono text-slate-500"
                >
                  <span class="text-green-400">📅</span>
                  <span>Obtenu le {{ cert.date }}</span>
                </div>
                <div
                  class="flex items-center gap-2 text-xs font-mono text-slate-500"
                >
                  <span class="text-green-400">#</span>
                  <span>Certificat n° {{ cert.certNumber }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                @for (tag of cert.tags; track tag) {
                  <span
                    class="text-[10px] font-mono px-2 py-0.5 rounded border"
                    [style.color]="cert.accentColor"
                    [style.border-color]="cert.accentColor + '30'"
                    [style.background-color]="cert.accentColor + '08'"
                  >
                    {{ tag }}
                  </span>
                }
              </div>

              <!-- Ce que j'ai appris -->
              @if (cert.learned) {
                <div
                  class="mb-3 p-3 rounded-lg bg-[#050a0e] border border-slate-800"
                >
                  <div class="text-[10px] font-mono text-slate-500 mb-1">
                    <span [style.color]="cert.accentColor">▸</span>
                    Ce que j'ai appris
                  </div>
                  <p class="text-xs font-mono text-slate-400 leading-relaxed">
                    {{ cert.learned }}
                  </p>
                </div>
              }

              <!-- Projet lié -->
              @if (cert.linkedProject) {
                <div
                  class="mb-3 flex items-center gap-2 text-xs font-mono"
                  (click)="$event.stopPropagation()"
                >
                  <span [style.color]="cert.accentColor">🔗</span>
                  <span class="text-slate-500">Projet lié :</span>
                  <a
                    [href]="cert.linkedProject.url"
                    target="_blank"
                    class="underline hover:opacity-80 transition-opacity"
                    [style.color]="cert.accentColor"
                  >
                    {{ cert.linkedProject.name }}
                  </a>
                </div>
              }

              @if (cert.pdfUrl) {
                <div
                  class="flex items-center gap-2 text-xs font-mono mt-2"
                  [style.color]="cert.accentColor"
                >
                  <span>📄</span><span>Cliquer pour voir le certificat</span>
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- ── GROUPE FRONTEND ── -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🅰️</span>
          <h2 class="text-xl text-slate-200 font-mono font-bold">
            Frontend &
            <span class="text-blue-400">Angular</span>
          </h2>
          <div class="flex-1 h-px bg-blue-400/10 ml-2"></div>
          <span class="text-xs font-mono text-slate-500 ml-2">
            {{ frontendCerts().length }} certif(s)
          </span>
        </div>

        @if (frontendCerts().length === 0) {
          <div
            class="p-6 rounded-xl border border-slate-800 bg-[#0a1520] text-center"
          >
            <p class="text-slate-500 font-mono text-sm">
              🚧 Certifications Frontend en cours d'obtention...
            </p>
          </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (cert of frontendCerts(); track cert.id) {
            <div
              class="cert-card group relative p-6 rounded-xl border
                        bg-[#0a1520] transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              [style.border-color]="cert.accentColor + '30'"
              (click)="openPdf(cert)"
            >
              <div
                class="absolute top-0 left-6 right-6 h-px rounded-full"
                [style.background]="
                  'linear-gradient(90deg, ' +
                  cert.accentColor +
                  ', transparent)'
                "
              ></div>

              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{{ cert.icon }}</span>
                  <div>
                    <div class="text-xs font-mono text-slate-500">
                      Délivré par
                    </div>
                    <div
                      class="text-sm font-mono font-bold"
                      [style.color]="cert.accentColor"
                    >
                      {{ cert.organism }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-mono"
                  [style.color]="cert.accentColor"
                  [style.border-color]="cert.accentColor + '40'"
                >
                  <span>✓</span><span>Vérifié</span>
                </div>
              </div>

              <h3
                class="text-lg text-slate-200 mb-3 leading-snug"
                style="font-family: 'Syne', sans-serif; font-weight: 700"
              >
                {{ cert.title }}
              </h3>

              <div class="flex flex-col gap-1 mb-4">
                <div
                  class="flex items-center gap-2 text-xs font-mono text-slate-500"
                >
                  <span class="text-blue-400">📅</span>
                  <span>Obtenu le {{ cert.date }}</span>
                </div>
                <div
                  class="flex items-center gap-2 text-xs font-mono text-slate-500"
                >
                  <span class="text-blue-400">#</span>
                  <span>Certificat n° {{ cert.certNumber }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                @for (tag of cert.tags; track tag) {
                  <span
                    class="text-[10px] font-mono px-2 py-0.5 rounded border"
                    [style.color]="cert.accentColor"
                    [style.border-color]="cert.accentColor + '30'"
                    [style.background-color]="cert.accentColor + '08'"
                  >
                    {{ tag }}
                  </span>
                }
              </div>

              <!-- Ce que j'ai appris -->
              @if (cert.learned) {
                <div
                  class="mb-3 p-3 rounded-lg bg-[#050a0e] border border-slate-800"
                >
                  <div class="text-[10px] font-mono text-slate-500 mb-1">
                    <span [style.color]="cert.accentColor">▸</span>
                    Ce que j'ai appris
                  </div>
                  <p class="text-xs font-mono text-slate-400 leading-relaxed">
                    {{ cert.learned }}
                  </p>
                </div>
              }

              <!-- Projet lié -->
              @if (cert.linkedProject) {
                <div
                  class="mb-3 flex items-center gap-2 text-xs font-mono"
                  (click)="$event.stopPropagation()"
                >
                  <span [style.color]="cert.accentColor">🔗</span>
                  <span class="text-slate-500">Projet lié :</span>
                  <a
                    [href]="cert.linkedProject.url"
                    target="_blank"
                    class="underline hover:opacity-80 transition-opacity"
                    [style.color]="cert.accentColor"
                  >
                    {{ cert.linkedProject.name }}
                  </a>
                </div>
              }

              @if (cert.pdfUrl) {
                <div
                  class="flex items-center gap-2 text-xs font-mono mt-2"
                  [style.color]="cert.accentColor"
                >
                  <span>📄</span><span>Cliquer pour voir le certificat</span>
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- ── GROUPE BACKEND ── -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🐍</span>
          <h2 class="text-xl text-slate-200 font-mono font-bold">
            Backend &
            <span class="text-purple-400">Data</span>
          </h2>
          <div class="flex-1 h-px bg-purple-400/10 ml-2"></div>
          <span class="text-xs font-mono text-slate-500 ml-2">
            {{ backendCerts().length }} certif(s)
          </span>
        </div>

        @if (backendCerts().length === 0) {
          <div
            class="p-6 rounded-xl border border-slate-800 bg-[#0a1520] text-center"
          >
            <p class="text-slate-500 font-mono text-sm">
              🚧 Certifications Backend en cours d'obtention...
            </p>
          </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (cert of backendCerts(); track cert.id) {
            <div
              class="cert-card group relative p-6 rounded-xl border
                bg-[#0a1520] transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              [style.border-color]="cert.accentColor + '30'"
              (click)="openPdf(cert)"
            >
              <div
                class="absolute top-0 left-6 right-6 h-px rounded-full"
                [style.background]="
                  'linear-gradient(90deg, ' +
                  cert.accentColor +
                  ', transparent)'
                "
              ></div>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{{ cert.icon }}</span>
                  <div>
                    <div class="text-xs font-mono text-slate-500">
                      Délivré par
                    </div>
                    <div
                      class="text-sm font-mono font-bold"
                      [style.color]="cert.accentColor"
                    >
                      {{ cert.organism }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-mono"
                  [style.color]="cert.accentColor"
                  [style.border-color]="cert.accentColor + '40'"
                >
                  <span>✓</span><span>Vérifié</span>
                </div>
              </div>
              <h3
                class="text-lg text-slate-200 mb-3 leading-snug"
                style="font-family: 'Syne', sans-serif; font-weight: 700"
              >
                {{ cert.title }}
              </h3>
              <div class="flex flex-col gap-1 mb-4">
                <div
                  class="flex items-center gap-2 text-xs font-mono text-slate-500"
                >
                  <span class="text-purple-400">📅</span>
                  <span>Obtenu le {{ cert.date }}</span>
                </div>
                <div
                  class="flex items-center gap-2 text-xs font-mono text-slate-500"
                >
                  <span class="text-purple-400">#</span>
                  <span>Certificat n° {{ cert.certNumber }}</span>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mb-4">
                @for (tag of cert.tags; track tag) {
                  <span
                    class="text-[10px] font-mono px-2 py-0.5 rounded border"
                    [style.color]="cert.accentColor"
                    [style.border-color]="cert.accentColor + '30'"
                    [style.background-color]="cert.accentColor + '08'"
                  >
                    {{ tag }}
                  </span>
                }
              </div>
              @if (cert.learned) {
                <div
                  class="mb-3 p-3 rounded-lg bg-[#050a0e] border border-slate-800"
                >
                  <div class="text-[10px] font-mono text-slate-500 mb-1">
                    <span [style.color]="cert.accentColor">▸</span> Ce que j'ai
                    appris
                  </div>
                  <p class="text-xs font-mono text-slate-400 leading-relaxed">
                    {{ cert.learned }}
                  </p>
                </div>
              }
              @if (cert.linkedProject) {
                <div
                  class="mb-3 flex items-center gap-2 text-xs font-mono"
                  (click)="$event.stopPropagation()"
                >
                  <span [style.color]="cert.accentColor">🔗</span>
                  <span class="text-slate-500">Projet lié :</span>
                  <a
                    [href]="cert.linkedProject.url"
                    target="_blank"
                    class="underline hover:opacity-80 transition-opacity"
                    [style.color]="cert.accentColor"
                  >
                    {{ cert.linkedProject.name }}
                  </a>
                </div>
              }
              @if (cert.pdfUrl) {
                <div
                  class="flex items-center gap-2 text-xs font-mono mt-2"
                  [style.color]="cert.accentColor"
                >
                  <span>📄</span><span>Cliquer pour voir le certificat</span>
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Section "En cours" -->
      <div class="mt-12 p-4 border border-green-400/10 rounded-lg bg-[#0a1520]">
        <div class="font-mono text-xs text-slate-500 mb-2">
          <span class="text-green-400">$</span>
          certifications --next
        </div>
        <p class="font-mono text-sm text-slate-300">
          🎯 Prochaine certification :
          <span class="text-green-400">AWS Cloud Practitioner</span>
        </p>
        <p class="font-mono text-xs text-slate-500 mt-1">
          Puis AWS Solutions Architect Associate → Certified Kubernetes
          Administrator
        </p>
      </div>
    </main>

    <!-- ── MODAL PDF ── -->
    @if (selectedCert()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @modalEnter
      >
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-sm"
          (click)="closePdf()"
        ></div>
        <div
          class="relative z-10 w-full max-w-4xl h-[90vh] rounded-xl border border-green-400/20
                    bg-[#050a0e] flex flex-col overflow-hidden"
        >
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-green-400/10"
          >
            <div>
              <div class="text-xs font-mono text-slate-500 mb-1">
                //
                {{ selectedCert()!.organism }}
              </div>
              <div class="text-sm font-mono text-slate-200 font-bold">
                {{ selectedCert()!.title }}
              </div>
            </div>
            <button
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg border
                           border-green-400/20 text-green-400 text-xs font-mono
                           hover:bg-green-400/10 transition-colors bg-transparent cursor-pointer"
              (click)="closePdf()"
            >
              <span>✕</span><span>Fermer</span>
            </button>
          </div>
          <div class="flex-1 overflow-hidden">
            <embed
              [src]="getSafeUrl(selectedCert()!.pdfUrl!)"
              type="application/pdf"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    }
  `,
})
export class CertificationsComponent {
  private sanitizer = inject(DomSanitizer)
  selectedCert = signal<Certification | null>(null)

  certifications: Certification[] = [
    {
      id: 'devops-methodology-2025',
      title: 'Discover the DevOps Methodology',
      organism: 'OpenClassrooms',
      date: '22 avril 2025',
      certNumber: '4924921205',
      icon: '🏆',
      accentColor: '#00ff88',
      category: 'devops',
      tags: ['DevOps', 'CI/CD', 'Méthodologie', 'Culture DevOps'],
      pdfUrl: 'certifications/discover-devops-methodology.pdf',
      learned:
        'Comprendre la culture DevOps, les principes CI/CD et la collaboration Dev/Ops pour livrer plus vite et mieux.',
      linkedProject: {
        name: 'Pipeline CI/CD complète',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'cicd-devops-2024',
      title:
        "Mettez en place l'intégration et la livraison continues avec la démarche DevOps",
      organism: 'OpenClassrooms',
      date: '25 novembre 2024',
      certNumber: '9416746583',
      icon: '⚙️',
      accentColor: '#ff6b35',
      category: 'devops',
      tags: ['CI/CD', 'Intégration Continue', 'DevOps', 'Livraison Continue'],
      pdfUrl: 'certifications/cicd-devops.pdf',
      learned:
        'Mettre en place GitHub Actions, automatiser le build, les tests et le déploiement continu sur AWS.',
      linkedProject: {
        name: 'App Dockerisée Angular + Nginx',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'observables-angular-2025',
      title: 'Maîtrisez les Observables pour dynamiser vos apps Angular',
      organism: 'OpenClassrooms',
      date: '12 août 2025',
      certNumber: '8760694679',
      icon: '🔄',
      accentColor: '#dd0031',
      category: 'frontend',
      tags: ['RxJS', 'Observables', 'Angular', 'Programmation Réactive'],
      pdfUrl: 'certifications/observables-angular.pdf',
      learned:
        'Maîtriser les Observables RxJS pour gérer les flux de données asynchrones et dynamiser les interfaces Angular.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'perfectionnez-angular-2025',
      title: 'Perfectionnez-vous sur Angular',
      organism: 'OpenClassrooms',
      date: '7 août 2025',
      certNumber: '2473374859',
      icon: '🅰️',
      accentColor: '#00aaff',
      category: 'frontend',
      tags: ['Angular', 'TypeScript', 'Standalone', 'Architecture'],
      pdfUrl: 'certifications/perfectionnez-angular.pdf',
      learned:
        'Approfondir les concepts avancés Angular : architecture, optimisation, bonnes pratiques et patterns modernes.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'signals-angular-2025',
      title:
        'Exploitez les Signals pour créer des interfaces réactives avec Angular',
      organism: 'OpenClassrooms',
      date: '6 juillet 2025',
      certNumber: '2109319950',
      icon: '⚡',
      accentColor: '#ff6bff',
      category: 'frontend',
      tags: ['Signals', 'Angular', 'Réactivité', 'computed()', 'signal()'],
      pdfUrl: 'certifications/signals-angular.pdf',
      learned:
        'Utiliser les Signals Angular pour créer des interfaces réactives modernes sans RxJS, avec signal(), computed() et effect().',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'formulaires-angular-2025',
      title: 'Créez des formulaires performants avec Angular',
      organism: 'OpenClassrooms',
      date: '14 août 2025',
      certNumber: '3438493592',
      icon: '📝',
      accentColor: '#ffd700',
      category: 'frontend',
      tags: ['Angular', 'Reactive Forms', 'FormBuilder', 'Validation'],
      pdfUrl: 'certifications/formulaires-angular.pdf',
      learned:
        'Créer des formulaires réactifs performants avec Angular : FormBuilder, FormGroup, validateurs personnalisés et gestion des erreurs.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'javascript-prog-2026',
      title: 'Apprenez à programmer avec JavaScript',
      organism: 'OpenClassrooms',
      date: '9 mars 2026',
      certNumber: '9462263805',
      icon: '🟨',
      accentColor: '#f7df1e',
      category: 'frontend',
      tags: ['JavaScript', 'Programmation', 'ES6', 'Fondamentaux'],
      pdfUrl: 'certifications/javascript-programmer.pdf',
      learned:
        'Maîtriser les bases de JavaScript : variables, fonctions, boucles, et logique de programmation.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'javascript-dom-2026',
      title: 'Créez des pages web dynamiques avec JavaScript',
      organism: 'OpenClassrooms',
      date: '13 mars 2026',
      certNumber: '3510160443',
      icon: '🌐',
      accentColor: '#ff9500',
      category: 'frontend',
      tags: ['JavaScript', 'DOM', 'Events', 'Dynamique'],
      pdfUrl: 'certifications/javascript-dom.pdf',
      learned:
        'Manipuler le DOM, gérer les événements et rendre les pages web interactives avec JavaScript.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'react-debut-2026',
      title: 'Débutez avec React',
      organism: 'OpenClassrooms',
      date: '5 mars 2026',
      certNumber: '6887854583',
      icon: '⚛️',
      accentColor: '#61dafb',
      category: 'frontend',
      tags: ['React', 'JSX', 'Composants', 'Props'],
      pdfUrl: 'certifications/react-debut.pdf',
      learned:
        'Découvrir React : composants, props, state et le rendu déclaratif des interfaces utilisateur.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'react-complet-2026',
      title: 'Créez une application React complète',
      organism: 'OpenClassrooms',
      date: '12 mars 2026',
      certNumber: '6229049778',
      icon: '⚛️',
      accentColor: '#00d8ff',
      category: 'frontend',
      tags: ['React', 'Hooks', 'API', 'Application'],
      pdfUrl: 'certifications/react-complet.pdf',
      learned:
        "Construire une application React complète avec hooks, gestion d'état et appels API REST.",
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    // ── BACKEND ──
    {
      id: 'python-poo-2025',
      title: 'Apprenez la programmation orientée objet avec Python',
      organism: 'OpenClassrooms',
      date: '7 juin 2025',
      certNumber: '2449125183',
      icon: '🐍',
      accentColor: '#3776ab',
      category: 'backend',
      tags: ['Python', 'POO', 'Classes', 'Héritage'],
      pdfUrl: 'certifications/python-poo.pdf',
      learned:
        'Maîtriser la programmation orientée objet avec Python : classes, héritage, encapsulation et polymorphisme.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'python-data-2025',
      title: "Initiez-vous à Python pour l'analyse de données",
      organism: 'OpenClassrooms',
      date: '9 août 2025',
      certNumber: '5303259532',
      icon: '📊',
      accentColor: '#4caf50',
      category: 'backend',
      tags: ['Python', 'Data', 'Pandas', 'Analyse'],
      pdfUrl: 'certifications/python-data.pdf',
      learned:
        'Utiliser Python pour analyser des données : manipulation de fichiers, Pandas et visualisation basique.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'python-tests-2025',
      title: 'Testez votre projet Python',
      organism: 'OpenClassrooms',
      date: '20 août 2025',
      certNumber: '9433270605',
      icon: '🧪',
      accentColor: '#ff5722',
      category: 'backend',
      tags: ['Python', 'Tests', 'Unittest', 'TDD'],
      pdfUrl: 'certifications/python-tests.pdf',
      learned:
        "Écrire des tests unitaires et d'intégration en Python avec unittest et pytest pour assurer la qualité du code.",
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
    {
      id: 'bdd-2025',
      title: 'Modélisez vos bases de données',
      organism: 'OpenClassrooms',
      date: '11 avril 2025',
      certNumber: '5783993110',
      icon: '🗄️',
      accentColor: '#9c27b0',
      category: 'backend',
      tags: ['Base de données', 'SQL', 'Modélisation', 'MCD'],
      pdfUrl: 'certifications/modelisez-bdd.pdf',
      learned:
        'Concevoir et modéliser des bases de données relationnelles : MCD, MLD, SQL et normalisation.',
      linkedProject: {
        name: 'Portfolio Angular DevOps',
        url: 'https://github.com/pountounyinyi',
      },
    },
  ]

  devopsCerts = computed(() =>
    this.certifications.filter((c) => c.category === 'devops'),
  )
  frontendCerts = computed(() =>
    this.certifications.filter((c) => c.category === 'frontend'),
  )
  backendCerts = computed(() =>
    this.certifications.filter((c) => c.category === 'backend'),
  )

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  openPdf(cert: Certification): void {
    if (cert.pdfUrl) this.selectedCert.set(cert)
  }

  closePdf(): void {
    this.selectedCert.set(null)
  }
}
