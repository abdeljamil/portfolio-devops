---
name: Documentation technique portfolio
overview: Rédaction d'une documentation technique unique, détaillée et complète en français pour le projet portfolio-devops, couvrant l'architecture, les modèles, les services, les composants, le routing, les styles et la configuration.
todos: []
isProject: false
---

# Plan de la documentation technique

## Objectif

Produire un fichier **DOCUMENTATION_TECHNIQUE.md** à la racine du projet, en français, détaillé et complet, servant de référence pour tout développeur rejoignant le projet ou pour la maintenance.

## Emplacement et format

- **Fichier** : [DOCUMENTATION_TECHNIQUE.md](DOCUMENTATION_TECHNIQUE.md) à la racine du repo.
- **Format** : Markdown avec titres, listes, extraits de code et un diagramme Mermaid pour l’architecture.
- **Langue** : Français.

---

## Structure de la documentation

### 1. Introduction

- Présentation du projet (portfolio DevOps Angular, objectif, public cible).
- Résumé en une phrase de l’architecture (SPA Angular 20, standalone, Signals, Tailwind).

### 2. Stack technique et prérequis

- Tableau récapitulatif : Angular 20, TypeScript 5.8, Tailwind 3.4, SCSS, RxJS 7.8, Zone.js.
- Versions Node (>= 20) et Angular CLI.
- Référence à [package.json](package.json) pour les dépendances exactes.

### 3. Architecture de l’application

- Diagramme Mermaid du flux : `main.ts` → `AppComponent` → `RouterOutlet` + `NavbarComponent` ; routes lazy → pages ; services `ThemeService` et `DevopsProgressService` injectés.
- Schéma des couches : shell (app.ts, navbar, footer), pages (home, parcours, projets, contact), shared components, core services, models.

### 4. Structure des dossiers

- Arborescence commentée de `src/` avec le rôle de chaque dossier et des fichiers clés :
  - [src/app/core/services/](src/app/core/services/)
  - [src/app/shared/components/](src/app/shared/components/)
  - [src/app/pages/](src/app/pages/)
  - [src/app/models/](src/app/models/)
  - [src/styles/](src/styles/)
- Mention des points d’entrée : [src/main.ts](src/main.ts), [src/app/app.config.ts](src/app/app.config.ts), [src/app/app.ts](src/app/app.ts).

### 5. Modèles de données

- Description des interfaces de [src/app/models/portfolio.models.ts](src/app/models/portfolio.models.ts) :
  - `DevOpsSkill` (id, name, icon, description, progress, status, tags, accentColor, startedAt) et type `SkillStatus`.
  - `Project` (id, title, icon, description, stack, githubUrl, demoUrl, status).
  - `TimelineItem` (id, date, title, company, description, type, active, tags) et type pour `type`.
- Rôle de chaque champ et valeurs possibles pour les statuts.

### 6. Services (core)

- **ThemeService** ([src/app/core/services/theme.service.ts](src/app/core/services/theme.service.ts)) : signal `theme` ('dark' | 'light'), persistance `localStorage` (clé `portfolio-theme`), `effect` pour appliquer les classes sur `document.documentElement`, méthode `toggle()`.
- **DevopsProgressService** ([src/app/core/services/devops-progress.service.ts](src/app/core/services/devops-progress.service.ts)) : signals privés `_skills`, `_projects`, `_timeline` ; API en lecture seule (`skills`, `projects`, `timeline`) ; `computed` `globalProgress` (moyenne des progress des skills). Liste des données exposées (skills, projets, timeline) sans tout recopier.

### 7. Composants partagés

- **NavbarComponent** : barre fixe, logo, liens (Accueil, Parcours, Projets, Contact), `RouterLinkActive`, badge "En stage · DevOps", ThemeToggle, menu mobile (signal `mobileOpen`).
- **ThemeToggleComponent** : bouton qui appelle `ThemeService.toggle()`, icône soleil/lune selon le thème, aria-label.
- **ProgressBarComponent** : inputs `value`, `color`, `showLabel` ; animation de la barre au scroll via `IntersectionObserver` (threshold 0.2) dans `ngAfterViewInit`.
- **TerminalComponent** : widget "terminal" avec barre de titre, animation de saisie de commande (`./check-progress.sh`), affichage des skills et barres ASCII, liens vers `DevopsProgressService.skills()`.

### 8. Pages (vues)

- **HomeComponent** : hero (whoami, titre, description, tags, CTAs), photo de profil avec anneau animé et badge "Disponible", section "Ma roadmap DevOps" avec grille de skills et `ProgressBarComponent`, animations `@heroEnter`, `@photoEnter`, `@cardsEnter` (stagger).
- **ParcoursComponent** : timeline verticale depuis `service.timeline()`, types stage/formation/certification, indicateur "En cours", animations stagger sur `.tl-item`.
- **ProjetsComponent** : filtres (tous / en cours / terminés / à venir) via signal `activeFilter`, `computed` `filteredProjects`, cartes avec lien GitHub/Demo, stack en tags, animation `@gridEnter`.
- **ContactComponent** : liens sociaux (email, GitHub, LinkedIn), formulaire Reactive Forms (name, email, message) avec validators (required, minLength, email), état `submitted` et `sending`, message de succès après envoi simulé (setTimeout). À noter : pas d’envoi réel côté backend ; documenter comment brancher un service ou une API.

### 9. Routing et chargement des vues

- Tableau des routes définies dans [src/app/app.routes.ts](src/app/app.routes.ts) : path, titre, composant lazy.
- Mécanisme de lazy loading : `loadComponent(() => import(...).then(m => m.XxxComponent))`.
- Fallback `path: '**'` → `redirectTo: ''`.
- Configuration dans [src/app/app.config.ts](src/app/app.config.ts) : `provideRouter(routes, withViewTransitions())`, `provideAnimationsAsync()`.

### 10. Styles, thème et Tailwind

- **global.scss** ([src/styles/global.scss](src/styles/global.scss)) : import polices (JetBrains Mono, Syne), `@tailwind base/components/utilities`, couches `@layer base` (reset, scroll smooth, body dark/light), `@layer components` (scanlines, grid-bg, terminal-card, skill-card, progress-animated, glow-green, scrollbar).
- **Tailwind** ([tailwind.config.js](tailwind.config.js)) : `darkMode: 'class'`, `content: "./src/**/*.{html,ts}"`, extension `fontFamily` (mono, display), couleurs personnalisées (terminal-bg, terminal-bg2, terminal-text, terminal-green, green.400).
- **PostCSS** ([postcss.config.js](postcss.config.js)) : plugins tailwindcss et autoprefixer.
- Application du thème : classe `dark` ou `light` sur `<html>` (voir [src/index.html](src/index.html) `class="dark"`), gérée par ThemeService.

### 11. Configuration du projet

- **angular.json** : projet `portfolio-devops`, builder application, styles `src/styles/global.scss`, assets `public`, configurations development/production (budgets, outputHashing, sourceMap).
- **tsconfig** : référence à [tsconfig.app.json](tsconfig.app.json) (extends, outDir, files, include).
- **index.html** : base href, meta viewport/description, polices Google Fonts, body `bg-[#050a0e]`.

### 12. Build, scripts et déploiement

- Scripts npm : `start`, `build`, `watch` (voir [package.json](package.json)).
- Commandes : `ng serve`, `ng build`, `ng build --configuration production`.
- Sortie du build : `dist/portfolio-devops/`.
- Section déploiement : intention S3/CloudFront (résumé des commandes du README), pipeline CI/CD à venir.

### 13. Personnalisation et évolution

- Modifier la progression DevOps : éditer les tableaux dans `DevopsProgressService`.
- Ajouter un projet ou un skill : structure des objets et où les insérer.
- Modifier les liens de contact : `socialLinks` et email dans [src/app/pages/contact/contact.component.ts](src/app/pages/contact/contact.component.ts).
- Idées d’extension : backend pour le formulaire contact, chargement des données depuis JSON ou API, pipeline GitHub Actions vers AWS.

### 14. Annexes

- Glossaire court : SPA, lazy loading, Signals, standalone component.
- Références : Angular docs, Tailwind docs, README du projet.

---

## Diagramme Mermaid prévu (section 3)

Un flowchart montrera : `main.ts` → `bootstrapApplication(AppComponent, appConfig)` → `AppComponent` (navbar + router-outlet + footer) ; `appConfig` (provideRouter, withViewTransitions, provideAnimationsAsync) ; routes → HomeComponent, ParcoursComponent, ProjetsComponent, ContactComponent (lazy) ; injection de ThemeService et DevopsProgressService dans les composants concernés. Les nœuds utiliseront des identifiants sans espaces (camelCase) et des libellés clairs.

---

## Livrable

Un seul fichier **DOCUMENTATION_TECHNIQUE.md** à la racine, contenant toutes les sections ci-dessus, avec extraits de code pertinents et liens vers les fichiers concernés. La documentation restera proportionnée au projet (pas de sur-documentation) mais couvrira chaque zone du code explorée.
