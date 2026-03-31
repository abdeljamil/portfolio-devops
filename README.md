# 🅰️ Portfolio DevOps — Angular 20

Portfolio Angular en temps réel reflétant une progression DevOps : Linux → Docker → AWS → CI/CD.

## 🛠 Stack
- **Angular 20** — Standalone components, Signals, @defer
- **Tailwind CSS v3** — Dark mode, thème terminal custom
- **Angular Animations** — Route transitions, stagger reveals
- **TypeScript strict**

## 🚀 Installation

### Prérequis
```bash
node -v     # >= 20
ng version  # Angular CLI 21 ✅
```

### 1. Créer le projet Angular
```bash
ng new portfolio-devops \
  --style=scss \
  --routing=true \
  --standalone=true \
  --skip-git=false
cd portfolio-devops
```

### 2. Installer Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
npx tailwindcss init
```

### 3. Copier les fichiers du projet
Remplace le contenu de `src/` par les fichiers fournis.

### 4. Lancer en dev
```bash
ng serve --open
# → http://localhost:4200
```

### 5. Build production
```bash
ng build
# Output dans dist/portfolio-devops/
```

## 📁 Structure
```
src/
├── app/
│   ├── core/services/
│   │   ├── devops-progress.service.ts   ← données + signals
│   │   └── theme.service.ts             ← dark/light mode
│   ├── shared/components/
│   │   ├── navbar/                      ← navigation responsive
│   │   ├── terminal/                    ← widget terminal animé
│   │   ├── progress-bar/                ← barre réutilisable
│   │   └── theme-toggle/                ← bouton dark/light
│   ├── pages/
│   │   ├── home/          ← hero + roadmap DevOps
│   │   ├── parcours/      ← timeline stage/formation
│   │   ├── projets/       ← cards + filtres
│   │   └── contact/       ← formulaire ReactiveForm
│   ├── models/            ← interfaces TypeScript
│   ├── app.routes.ts      ← routing lazy-loaded
│   └── app.config.ts      ← bootstrap + providers
└── styles/
    └── global.scss        ← Tailwind + custom
```

## ✏️ Personnalisation

### Mettre à jour ta progression
Édite `src/app/core/services/devops-progress.service.ts` :
```typescript
{ id: 'docker', progress: 60 }  // ← change ce nombre au fil du temps
```

### Ajouter un projet
```typescript
private _projects = signal<Project[]>([
  // ... projets existants
  {
    id: 'mon-projet',
    title: 'Mon nouveau projet',
    icon: '🔧',
    description: '...',
    stack: ['Docker', 'AWS'],
    githubUrl: 'https://github.com/...',
    status: 'done'
  }
]);
```

### Changer tes infos de contact
Édite `src/app/pages/contact/contact.component.ts` :
```typescript
socialLinks = [
  { icon: '📧', label: 'Email', url: 'mailto:TON@EMAIL.COM' },
  { icon: '⌥', label: 'GitHub', url: 'https://github.com/TON_USER' },
  { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/TON_PROFIL' },
];
```

## ☁️ Déploiement AWS S3 (à venir dans ta pipeline)

```bash
# Build
ng build --configuration production

# Upload sur S3
aws s3 sync dist/portfolio-devops/ s3://TON-BUCKET --delete

# Activer le site statique
aws s3 website s3://TON-BUCKET \
  --index-document index.html \
  --error-document index.html
```

## 🤖 Généré avec Claude AI
Ce portfolio a été conçu avec une architecture Angular moderne.
La pipeline CI/CD avec GitHub Actions vers AWS est la prochaine étape ! 🚀
