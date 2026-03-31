import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Portfolio | DevOps en progression'
  },
  {
    path: 'parcours',
    loadComponent: () => import('./pages/parcours/parcours.component').then(m => m.ParcoursComponent),
    title: 'Parcours | Portfolio DevOps'
  },
  {
    path: 'projets',
    loadComponent: () => import('./pages/projets/projets.component').then(m => m.ProjetsComponent),
    title: 'Projets | Portfolio DevOps'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact | Portfolio DevOps'
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./pages/certifications/certifications.component')
        .then(m => m.CertificationsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'À propos | Portfolio DevOps'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
