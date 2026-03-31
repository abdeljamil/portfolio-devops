import { computed, Injectable, signal } from '@angular/core';
import { DevOpsSkill, Project, TimelineItem } from '../../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class DevopsProgressService {

  private _skills = signal<DevOpsSkill[]>([
    {
      id: 'linux',
      name: 'Linux',
      icon: '🐧',
      description: 'Bash scripting, gestion des processus, systemd, permissions, cron jobs, troubleshooting serveur.',
      progress: 78,
      status: 'mastered',
      tags: ['Bash', 'systemd', 'SSH', 'cron', 'vim'],
      accentColor: '#00ff88',
      startedAt: '2024-01'
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: '🐳',
      description: 'Containerisation d\'apps Angular et backend. Multi-stage build, Docker Compose, networking.',
      progress: 80,
      status: 'learning',
      tags: ['Dockerfile', 'Compose', 'Hub', 'Volumes'],
      accentColor: '#00aaff',
      startedAt: '2024-03'
    },
    {
      id: 'aws',
      name: 'AWS',
      icon: '☁️',
      description: 'EC2, S3 static hosting, IAM roles et policies. Découverte de l\'architecture cloud.',
      progress: 40,
      status: 'learning',
      tags: ['EC2', 'S3', 'IAM', 'VPC', 'CloudFront'],
      accentColor: '#ff6b35',
      startedAt: '2024-04'
    },
    {
      id: 'cicd',
      name: 'CI/CD',
      icon: '⚙️',
      description: 'Pipeline GitHub Actions à construire. Objectif : déploiement automatisé sur AWS à chaque push.',
      progress: 20,
      status: 'coming',
      tags: ['GitHub Actions', 'Jenkins', 'ArgoCD'],
      accentColor: '#ff3b5c'
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      icon: '☸️',
      description: 'Orchestration de containers. Pods, services, deployments, Helm charts.',
      progress: 0,
      status: 'planned',
      tags: ['kubectl', 'Helm', 'Ingress', 'Pods'],
      accentColor: '#dd6bff'
    },
    {
      id: 'angular',
      name: 'Angular',
      icon: '🅰️',
      description: 'Framework principal. Standalone components, Signals, RxJS, routing, Tailwind CSS.',
      progress: 85,
      status: 'mastered',
      tags: ['TypeScript', 'Signals', 'RxJS', 'Tailwind'],
      accentColor: '#dd0031',
      startedAt: '2023-09'
    }
  ]);

  private _projects = signal<Project[]>([
    {
      id: 'portfolio',
      title: 'Portfolio Angular DevOps',
      icon: '🅰️',
      description: 'Ce portfolio — Angular 21 + Tailwind, déployé sur AWS S3, pipeline CI/CD en construction.',
      stack: ['Angular 21', 'TypeScript', 'Tailwind', 'AWS S3'],
      githubUrl: 'https://github.com/pountounyinyi',
      status: 'in-progress'
    },
    {
      id: 'docker-angular',
      title: 'App Dockerisée Angular + Nginx',
      icon: '🐳',
      description: 'Containerisation d\'une app Angular avec build multi-stage Docker et nginx en reverse proxy.',
      stack: ['Docker', 'Nginx', 'Multi-stage', 'Angular'],
      githubUrl: 'https://github.com/pountounyinyi',
      status: 'done'
    },
    {
      id: 'aws-infra',
      title: 'Infra AWS Static Hosting',
      icon: '☁️',
      description: 'Configuration S3 + CloudFront + Route 53 pour héberger des apps Angular. IAM roles.',
      stack: ['AWS S3', 'CloudFront', 'Route 53', 'IAM'],
      githubUrl: 'https://github.com/pountounyinyi',
      status: 'done'
    },
    {
      id: 'cicd-pipeline',
      title: 'Pipeline CI/CD complète',
      icon: '⚙️',
      description: 'Build → Test → Dockerize → Push ECR → Deploy EC2. GitHub Actions + AWS. En construction...',
      stack: ['GitHub Actions', 'ECR', 'EC2', 'Docker'],
      status: 'in-progress'
    }
  ]);

  // private _timeline = signal<TimelineItem[]>([
  //   {
  //     id: 'stage',
  //     date: '2024 — Présent',
  //     title: 'Stagiaire Développeur / DevOps',
  //     company: 'Entreprise en stage',
  //     description: 'Développement d\'applications Angular, configuration de serveurs Linux, premiers déploiements Docker en staging.',
  //     type: 'stage',
  //     active: true,
  //     tags: ['Angular', 'Linux', 'Docker', 'Git']
  //   },
  //   {
  //     id: 'formation-devops',
  //     date: '2024 — En cours',
  //     title: 'Formation DevOps intensive',
  //     company: 'Auto-formation + Certification',
  //     description: 'Linux avancé → Docker → AWS → CI/CD. Objectif : certification AWS Cloud Practitioner.',
  //     type: 'formation',
  //     active: true,
  //     tags: ['Linux', 'Docker', 'AWS', 'CI/CD']
  //   },
  //   {
  //     id: 'formation-dev',
  //     date: '2023 — 2024',
  //     title: 'Formation Développement Web',
  //     company: 'École / Formation',
  //     description: 'Apprentissage du développement frontend avec Angular, TypeScript, et les bases du backend.',
  //     type: 'formation',
  //     active: false,
  //     tags: ['Angular', 'TypeScript', 'HTML/CSS', 'Git']
  //   }
  // ]);


  private _timeline = signal<TimelineItem[]>([
    {
      id: 'stage-academique-2023',
      date: 'Mai — Juin 2023',
      title: 'Stage Académique',
      company: '2SI.inc — Société d\'Ingénierie en Système Information · Douala',
      description: 'Stage académique au sein d\'une société d\'ingénierie spécialisée en systèmes d\'information. Participation à des projets de développement logiciel.',
      type: 'stage',
      active: false,
      tags: ['Génie Logiciel', 'Systèmes d\'Information', 'Douala']
    },
    {
      id: 'licence-2023',
      date: '2022 — 2023',
      title: 'Licence de Technologie — Génie Informatique',
      company: 'IUT de Ngaoundéré · Option Génie Logiciel',
      description: 'Licence de technologie en génie informatique option génie logiciel. Approfondissement des compétences en développement logiciel et systèmes informatiques.',
      type: 'formation',
      active: false,
      tags: ['Génie Logiciel', 'Algorithmique', 'Base de données', 'Réseaux']
    },
    {
      id: 'stage-maitrise-2022',
      date: 'Avril — Juillet 2022',
      title: 'Stage Agent de Maîtrise',
      company: '2SI.inc — Société d\'Ingénierie en Système Information · Douala',
      description: 'Stage agent de maîtrise dans une société d\'ingénierie. Montée en compétences sur les systèmes d\'information et les outils de développement.',
      type: 'stage',
      active: false,
      tags: ['Systèmes d\'Information', 'Développement', 'Douala']
    },
    {
      id: 'dut-2022',
      date: '2020 — 2022',
      title: 'DUT — Génie Informatique',
      company: 'IUT de Ngaoundéré · Option Génie Logiciel',
      description: 'Diplôme Universitaire de Technologie en génie informatique. Formation aux fondamentaux du développement logiciel, réseaux, bases de données et programmation.',
      type: 'formation',
      active: false,
      tags: ['Angular', 'TypeScript', 'HTML/CSS', 'JavaScript', 'Git']
    },
    {
      id: 'stage-ouvrier-2021',
      date: 'Juin — Juillet 2021',
      title: 'Stage Ouvrier',
      company: 'IUT de Ngaoundéré',
      description: 'Premier stage de découverte du monde professionnel dans le domaine informatique.',
      type: 'stage',
      active: false,
      tags: ['Informatique', 'Découverte', 'Ngaoundéré']
    },
    {
      id: 'bac-2016',
      date: '2016',
      title: 'Baccalauréat Série D',
      company: 'Lycée Bilingue de Mendong',
      description: 'Baccalauréat en Mathématiques et Sciences de la Vie et de la Terre. Base scientifique solide orientée vers l\'ingénierie.',
      type: 'formation',
      active: false,
      tags: ['Mathématiques', 'SVT', 'Sciences']
    },
    {
      id: 'devops-2024',
      date: '2024 — Présent',
      title: 'Formation DevOps & Cloud',
      company: 'Auto-formation intensive',
      description: 'Apprentissage de Linux, Docker, AWS et CI/CD. Objectif : certification AWS Cloud Practitioner puis Solutions Architect.',
      type: 'formation',
      active: true,
      tags: ['Linux', 'Docker', 'AWS', 'CI/CD', 'Kubernetes']
    },
    {
      id: 'angular-2023',
      date: '2023 — Présent',
      title: 'Développeur Angular',
      company: 'Projets personnels & Portfolio',
      description: 'Développement d\'applications web avec Angular 21, TypeScript, RxJS, Tailwind CSS et Standalone Components.',
      type: 'stage',
      active: true,
      tags: ['Angular 21', 'TypeScript', 'RxJS', 'Tailwind', 'Signals']
    },
    {
      id: 'certif-devops-openclassrooms-2025',
      date: '22 avril 2025',
      title: 'Discover the DevOps Methodology',
      company: 'OpenClassrooms · Certificat n° 4924921205',
      description: 'Certification validant la découverte et la compréhension de la méthodologie DevOps : culture, pratiques CI/CD, collaboration Dev et Ops.',
      type: 'certification',
      active: false,
      tags: ['DevOps', 'CI/CD', 'OpenClassrooms', 'Méthodologie']
    },
  ]);

  readonly skills = this._skills.asReadonly();
  readonly projects = this._projects.asReadonly();
  readonly timeline = this._timeline.asReadonly();

  readonly globalProgress = computed(() => {
    const skills = this._skills();
    return Math.round(skills.reduce((acc, s) => acc + s.progress, 0) / skills.length);
  });
}
