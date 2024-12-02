import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

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
