import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  soyAdmin?:boolean
  hayToken?:boolean

  constructor( 
    private cookie:CookieService, 
    private UserService: UserService
    ){}
  
    ngOnInit(): void {
      this.cookie.get('token')?this.hayToken=true:this.hayToken=false
      this.cookie.get('role')==='admin'?this.soyAdmin = true : this.soyAdmin = false

      this.UserService.getRoleObservable().subscribe(role=>{
        this.soyAdmin = role === "admin"
        console.log('este es role', role)
      })
      
      this.UserService.getTokenObservable().subscribe(token=>{
        token?this.hayToken=true: this.hayToken=false
        console.log('este es token', token)
      })
    }

    doLogout(){
      this.UserService.logout()
    }

}
