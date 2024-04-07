import { Component } from '@angular/core';
import { TableFilmsComponent } from '../../../app/components/adminComponents/adminFilms/table-films/table-films.component';
import { FormCreateFilmComponent } from '../../../app/components/adminComponents/adminFilms/form-create-film/form-create-film.component';
import { FormDeleteFilmComponent } from '../../../app/components/adminComponents/adminFilms/form-delete-film/form-delete-film.component';

@Component({
  selector: 'app-admin-films',
  standalone: true,
  imports: [TableFilmsComponent, FormCreateFilmComponent, FormDeleteFilmComponent],
  templateUrl: './admin-films.component.html',
  styleUrl: './admin-films.component.css'
})
export class AdminFilmsComponent {
}