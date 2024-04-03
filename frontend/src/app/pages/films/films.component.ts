import { Component, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filmService.findAll().subscribe(
      (res) => (this.films = res as Film[]),
      (err) => console.log(err)
    );
  }
}