# Guide de compréhension — Angular 20 (Portfolio DevOps)

Ce document est un **guide pédagogique** pour comprendre **Angular 20** à travers **ton projet** `portfolio-devops`. Il complète `DOCUMENTATION_TECHNIQUE.md` (référence exhaustive) et se concentre sur : **comment lire le code**, **la logique derrière**, et les **concepts Angular 20** utilisés.

---

## 0) La “photo mentale” du projet

- Application **SPA** Angular.
- La navigation se fait via le **Router** : la page courante est rendue dans `<router-outlet>`.
- Les données affichées (skills, projets, timeline) proviennent d’un **service central** : `DevopsProgressService`.
- Le thème (dark/light) est un **état global** : `ThemeService`.
- Les pages sont **lazy-loaded** (chargées à la demande) via `loadComponent`.
- UI : **Tailwind CSS** + un SCSS global.

---

## 1) Bootstrap : comment l’app démarre

### 1.1 `src/main.ts`

C’est le point d’entrée. Angular démarre avec :

- `bootstrapApplication(AppComponent, appConfig)`

Ça veut dire :

- pas de `NgModule` racine
- approche **standalone** (moderne)

### 1.2 `src/app/app.config.ts`

C’est la config globale (providers). On y voit notamment :

- `provideRouter(routes, withViewTransitions())`
- `provideAnimationsAsync()`

**À retenir :** tout ce qui doit exister “au niveau application” se déclare ici.

---

## 2) Le composant racine (“shell”)

### 2.1 `src/app/app.ts`

`AppComponent` est la structure globale :

- Navbar toujours affichée
- `<router-outlet>` pour afficher la page courante
- footer toujours affiché

Le shell contient aussi une animation de transition de route (fade/slide) appliquée au contenu du router-outlet.

### 2.2 Pourquoi `standalone: true` ?

Avec Angular 20, tu peux faire des apps composées uniquement de **composants standalone** :

- chaque composant déclare ce qu’il utilise via `imports: [...]`
- tu évites les `NgModule` de déclaration

---

## 3) Routing : comment les pages se chargent

### 3.1 `src/app/app.routes.ts`

Chaque route définit :

- `path` : segment d’URL
- `loadComponent` : import dynamique → **lazy loading**

Routes principales :

- `/` → Home
- `/parcours` → Parcours
- `/projets` → Projets
- `/contact` → Contact

La route `**` redirige vers `/`.

### 3.2 Pourquoi le lazy loading ?

- temps de chargement initial plus faible
- code des pages téléchargé seulement si l’utilisateur visite la page

---

## 4) La logique métier : Services + Signals

Ton projet utilise **Signals** comme modèle d’état moderne.

### 4.1 Signals : le minimum à connaître

- Lire un signal : `mySignal()`
- Écrire : `mySignal.set(value)`
- Mettre à jour : `mySignal.update(v => ...)`

**Intuition :** un signal = une variable qui notifie automatiquement la vue quand elle change.

### 4.2 `DevopsProgressService` : la “base de données locale”

**Fichier :** `src/app/core/services/devops-progress.service.ts`

- `_skills`, `_projects`, `_timeline` sont des `signal([...])`.
- `skills`, `projects`, `timeline` sont exposés en lecture seule (`asReadonly()`).
- `globalProgress` est un `computed(...)` (moyenne des progress).

**Pourquoi `asReadonly()` ?**

- Les pages peuvent lire
- mais elles ne peuvent pas modifier directement l’état source

### 4.3 `ThemeService` : thème global dark/light

**Fichier :** `src/app/core/services/theme.service.ts`

- `_theme = signal('dark')`
- au démarrage : lit `localStorage('portfolio-theme')`
- `effect(...)` applique `dark`/`light` sur `<html>` + persiste dans `localStorage`
- `toggle()` fait le switch

**Rôle de `effect()` :** relier un état (signal) à des effets “réels” (DOM + stockage).

---

## 5) Comprendre les pages : ce qu’elles font “vraiment”

### 5.1 Home

**Fichier :** `src/app/pages/home/home.component.ts`

- injecte `DevopsProgressService`
- affiche hero + progression globale
- boucle sur `service.skills()` pour construire la roadmap
- utilise `ProgressBarComponent`
- animations d’entrée (stagger)

**Nouveautés Angular modernes :**

- `inject(...)` au lieu du constructor
- `@for` et `@if` (au lieu de `*ngFor`, `*ngIf`)

### 5.2 Parcours

**Fichier :** `src/app/pages/parcours/parcours.component.ts`

- boucle sur `service.timeline()`
- mappe `type` → libellé/couleur (fonctions utilitaires)
- met en évidence les items `active`

### 5.3 Projets

**Fichier :** `src/app/pages/projets/projets.component.ts`

- signal UI : `activeFilter = signal('all')`
- `filteredProjects()` filtre `service.projects()` selon le statut

**Idée :**

- le service = données
- le composant = état UI + affichage + logique simple de filtre

### 5.4 Contact

**Fichier :** `src/app/pages/contact/contact.component.ts`

- Reactive Forms (`FormBuilder`, `Validators`)
- signals UI : `submitted`, `sending`
- `onSubmit()` valide, puis simule un envoi avec `setTimeout`

#### Brancher un vrai envoi (plus tard)

Si tu veux un envoi réel :

1) Ajouter HTTP au niveau app (`provideHttpClient()` dans `app.config.ts`)
2) Créer un service `ContactService` qui fait un `http.post(...)`
3) Remplacer `setTimeout` par l’appel HTTP + gestion des erreurs

---

## 6) Comprendre les composants partagés

### 6.1 Navbar

**Fichier :** `src/app/shared/components/navbar/navbar.component.ts`

- liens router + `RouterLinkActive`
- menu mobile via `mobileOpen = signal(false)`
- inclut `ThemeToggleComponent`

### 6.2 ThemeToggle

**Fichier :** `src/app/shared/components/theme-toggle/theme-toggle.component.ts`

- appelle `themeService.toggle()`
- icône selon `themeService.isDark()`

### 6.3 ProgressBar

**Fichier :** `src/app/shared/components/progress-bar/progress-bar.component.ts`

- inputs : `value`, `color`, `showLabel`
- démarre l’animation quand le composant est visible via `IntersectionObserver`

### 6.4 Terminal

**Fichier :** `src/app/shared/components/terminal/terminal.component.ts`

- lit `skills` depuis `DevopsProgressService`
- tape la commande “fake” char par char
- affiche une barre ASCII en fonction du pourcentage

---

## 7) Styles : Tailwind + thème

### 7.1 Fichiers clés

- `src/styles/global.scss` : Tailwind + styles custom (scanlines, grid-bg, scrollbar…)
- `tailwind.config.js` : `darkMode: 'class'`, fonts et couleurs “terminal”
- `postcss.config.js` : pipeline Tailwind/autoprefixer

### 7.2 Comment le thème marche

- Le thème est appliqué via une classe sur `<html>`.
- `ThemeService` ajoute/enlève `dark`/`light`.
- Tailwind lit ces classes via `darkMode: 'class'`.

---

## 8) Ordre de lecture recommandé (pour comprendre vite)

1. `src/main.ts`
2. `src/app/app.config.ts`
3. `src/app/app.routes.ts`
4. `src/app/app.ts`
5. `src/app/core/services/theme.service.ts`
6. `src/app/core/services/devops-progress.service.ts`
7. Pages : `home` → `parcours` → `projets` → `contact`
8. Composants partagés : `navbar` → `theme-toggle` → `progress-bar` → `terminal`
9. Styles : `src/styles/global.scss` + `tailwind.config.js`

---

## 9) Glossaire rapide

- **SPA** : application mono-page, navigation côté client.
- **Standalone component** : composant autonome qui déclare ses imports.
- **Signal** : état réactif (`signal()`).
- **computed** : valeur dérivée automatiquement.
- **effect** : réaction automatique pour DOM/persistance.
- **Lazy loading** : chargement d’une page à la demande via import dynamique.
