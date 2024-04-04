import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const adminProtectGuard: CanActivateFn = (route, state) => {
  const cookies =  inject(CookieService);//injectar el servicio cookies en modulo sin constructor
  const role = cookies.get('role')
  if (role === "admin"){
    return true
  }else{
    return false
  }