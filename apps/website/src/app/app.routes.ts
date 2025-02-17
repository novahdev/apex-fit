import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: 'login', loadComponent: () => import('./pages/sign-in-page/sign-in-page.component').then(m => m.SignInPageComponent) },
    { path: 'registrarse', loadComponent: () => import('./pages/sign-up-page/sign-up-page.component').then(m => m.SignUpPageComponent) },
    { path: '', loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent) },
];
