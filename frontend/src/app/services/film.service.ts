import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FimlsCreateData } from '../interfaces/dto/films-create-data';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  url:string ='http://localhost:3000/api/films'

  constructor(private http: HttpClient, private cookies:CookieService) {
    
   }

  findAll (){
    return this.http.get(`${this.url}?token=${this.cookies.get('token')}`);
  }

  insert (data: FimlsCreateData){
    return this.http.post(`${this.url}?token=${this.cookies.get('token')}`, data)
  }

  deleteOne (id:string){
    return this.http.delete(`${this.url}/${id}?token=${this.cookies.get('token')}`)
  }
}