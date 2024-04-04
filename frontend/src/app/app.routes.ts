import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FilmsComponent } from './pages/films/films.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminFilmsComponent } from './pages/admin-films/admin-films.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FilmComponent } from './pages/film/film.component';
import { userProtectGuard } from './guards/user-protect.guard';
import { adminProtectGuard } from './guards/admin-protect.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component:LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: "films",
        component: FilmsComponent,
        children: [{            
            component: FilmComponent,
            path: ":id",
        }],
        canActivate:[userProtectGuard]
    },
    {
        path: "adminUsers",
        component: AdminUsersComponent,
        canActivate:[userProtectGuard, adminProtectGuard]
        
    },
    {
        path: "adminFilms",
        component: AdminFilmsComponent,
        canActivate:[userProtectGuard, adminProtectGuard]
    },
    {
        path: "**",
        component: NotFoundComponent,
        redirectTo: ""
    }
];
