import { Component, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-film',
  standalone: true,
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent implements OnInit {
  filmId: string = ''
  film: Film = {
    _id:"",
    title: "",
    year: 0,
    img: "",
    category: "",
    director: "",
    synopsis:""
    } 

  constructor(private activatedRoute: ActivatedRoute, private filmService: FilmService) {}
  
  ngOnInit(): void {
  this.activatedRoute.params.subscribe({
      next:(res: any)=> {
        this.filmId = res.id,
        this.filmService.findById(this.filmId).subscribe({
          next: (res) => this.film = res as Film,
          error: (err) => console.log(err)
        })
      },
      error:(err) => console.log(err)
    })
  }
}
