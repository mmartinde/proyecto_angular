import { UserService } from './../../../services/user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector:'login-form.component',
  standalone:true,
  imports:[ReactiveFormsModule],
  templateUrl:'./login-form.component.html',
  styleUrls:['./login-form.component.css'],
})

export class LoginUserFormComponent implements OnInit {
  ngOnInit(): void {
  }
  showLoginForm: boolean=true;
  showRegisterForm: boolean=false;

  constructor(
    private touter:Router,
    private UserService: UserService,
  ){}

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    password:new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  loginForm: FormGroup =new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(){
    if (this.showLoginForm && this.loginForm.valid) {
      console.log("Logging in");
      const loginFormData = this.loginForm.value;

      this.UserService.loginUser(loginFormData).subscribe((res)=>{
      console.log('login successful', response);
      console.log('login successeful', response.data.token);
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('id_user',response.user._id);
      localStorage.setItem('user_name',response.data.user.name);

      console.log(this.loginForm.value);
      this.router.navigate(['/'ubicacion]);
      });
  }else if(!this.showLoginForm && this.registerForm.valid){
    const password = this.registerForm.get('password')?.value; 
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;  
    
    if(password === confirmPassword){
      const resgisterFormData = this.registerForm.value;
      this.UserService.registerUser(resgisterFormData).subscribe(
        (response)=>{
          console.log('Registration Successfull',response);
          console.log(this.registerForm.value);
          this.router.navigate(['/ubicacion']);
        },
        (error) =>{
          console.error('Error during login: ', error);
        }
      );
    }else{
      alert('Las contraseñas no son iguales');
    }
  }
}

  toggleForm(){
    this.showLoginForm=!this.showLoginForm;
  }
}


describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
