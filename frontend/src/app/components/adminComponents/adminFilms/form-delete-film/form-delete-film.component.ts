import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmService } from '../../../../services/film.service';

@Component({
  selector: 'app-form-delete-film',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './form-delete-film.component.html',
  styleUrls: ['./form-delete-film.component.css']
})
export class FormDeleteFilmComponent {

  delFilmForm: FormGroup = this.formBuilder.group({
    id : new FormControl(null,[Validators.required])
  })
  
  
  constructor(
    private formBuilder: FormBuilder, 
    private filmService: FilmService
    ) {
  }

  deleteFilm(): void {
    const id = this.delFilmForm.get('id')?.value;
    console.log (id);

    if (!id) {
      alert('Por favor, ingrese un ID de película válido.');
      return;
    }

    this.filmService.deleteOne(id)
      .subscribe({
        next: (res: any) => {
          alert('Película eliminada correctamente');
          console.log('Película eliminada:', res);
        },
        error: (err) => {
          alert('Error al eliminar la película');
          console.log('Error al eliminar película:', err);
        }
      });
  }
}