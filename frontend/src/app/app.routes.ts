import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FilmsComponent } from './pages/films/films.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminFilmsComponent } from './pages/admin-films/admin-films.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FilmComponent } from './pages/film/film.component';

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
        path: 'films',
        component:FilmsComponent,
    },
    {
        path: "films",
        component: FilmsComponent,
        /* canActivate: [authGuard], */
        children: [{            
            component: FilmComponent,
            path: ":id",
        }]
    },
    {
        path: "adminUsers",
        component: AdminUsersComponent,
        
    },
    {
        path: "adminFilms",
        component: AdminFilmsComponent,
        
    },
    {
        path: "**",
        component: NotFoundComponent,
        redirectTo: ""
    }
];
