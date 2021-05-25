import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './Shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _servc:AuthService,private route:Router){}
  canActivate():boolean {
       if(this._servc.loggedIn()){
         return true
       }else{
         this.route.navigate(['/login'])
         return false
       }
    
  }
  
}
