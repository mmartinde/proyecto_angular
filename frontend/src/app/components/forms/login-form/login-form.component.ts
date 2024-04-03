import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginData } from './../../../interfaces/dto/user-login-data';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit{
  showLoginForm: boolean = true;
  showRegisterForm: boolean = false;
  hidePassword: boolean = true;

  ngOnInit(): void {
  }

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private cookies: CookieService,
    private router: Router // Inyectar el servicio Router
  ) {}

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  loginForm: FormGroup = this.formbuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });


  onSubmit() {
    if (this.showLoginForm && this.loginForm.valid) {
      const data: UserLoginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.userService.login(data).subscribe({
        next: (res: any) => {
          this.userService.setTokenRole(res.token, res.role),
          this.router.navigate(['/films']);
          console.log(res)},
          
        error: (err) => console.log(err), 
        });
        
    }else if(!this.showLoginForm && this.registerForm.valid){
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        const registerFormData = this.registerForm.value;
        this.userService.register(registerFormData).subscribe(
          (response) => {
            console.log('Register successful', response);
            console.log(this.registerForm.value);
            alert('Enhorabuena, se ha registrado con exito');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error during login: ', error);
          }
        );

      } else {
        alert('Las contraseñas no son iguales');
      }
    }
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }
  
} 

