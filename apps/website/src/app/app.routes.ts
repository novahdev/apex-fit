import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: 'login', loadComponent: () => import('./pages/sign-in-page/sign-in-page.component').then(m => m.SignInPageComponent) },
    { path: 'registrarse', loadComponent: () => import('./pages/sign-up-page/sign-up-page.component').then(m => m.SignUpPageComponent) },
    { 
        path: '', loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [
            { path: 'workouts', loadComponent: () => import('./pages/workouts-page/workouts-page.component').then(m => m.WorkoutsPageComponent) },
            { path: 'ejercicios', loadComponent: () => import('./pages/exercises-page/exercises-page.component').then(m => m.ExercisesPageComponent) },
            { path: 'atletas', loadComponent: () => import('./pages/athletes-page/athletes-page.component').then(m => m.AthletesPageComponent) },
            { path: 'gyms', loadComponent: () => import('./pages/gyms-page/gyms-page.component').then(m => m.GymsPageComponent) },
            { path: 'competencias', loadComponent: () => import('./pages/competitions-page/competitions-page.component').then(m => m.CompetitionsPageComponent) },
            { path: 'mi-perfil', loadComponent: () => import('./pages/my-profile-page/my-profile-page.component').then(m => m.MyProfilePageComponent) },
        ]
    },
];
