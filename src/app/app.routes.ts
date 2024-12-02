import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { enrolledGuard } from './guards/enrolled/enrolled.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    },
    {
        path: 'app',
        loadComponent: () => import('./layouts/base-layout/base-layout.component').then(m => m.BaseLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
            },
            {
                path: 'my-subjects',
                loadComponent: () => import('./pages/my-subjects/my-subjects.component').then(m => m.MySubjectsComponent),
            },
            {
                path: 'subject/:id',
                loadComponent: () => import('./pages/subject/subject.component').then(m => m.SubjectComponent),
                canActivate: [enrolledGuard]
            }
        ],
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
    }
];
