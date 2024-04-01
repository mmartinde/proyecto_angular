import { Component } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { FilmService } from '../../../../../../../services/film.service';


@Component({
  selector: 'app-form-delete-film',
  standalone: true,
  imports: [],
  templateUrl: './form-delete-film.component.html',
  styleUrl: './form-delete-film.component.css'
})

export class FormDeleteFilmComponent {

  delFilm: FormGroup = this.formBuilder.group({
    id: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService
  ){}
  
  deleteFilm(){
    const id: string = this.delFilm.get('id')?.value

    this.filmService.deleteOne(id).subscribe({
      next: (res: any) => {
         // Mostrar mensaje de éxito en la interfaz de usuario
        console.log('Película eliminada:',res)
      },
      error: (err) => {
        // Mostrar mensaje de error en la interfaz de usuario
        console.log('Error al eliminar película:', err)
      }
    });
  }  

}
