import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})

export class AuthService {
//private _logUrl:string = "https://backend-auth1.herokuapp.com/employees/login"
private _logUrl:string = "http://localhost:8080/employees/login"
  constructor(private http:HttpClient,private route:Router) { }


  loginUser(user){
    return this.http.post<any>(this._logUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  
  logoutUser(){
    localStorage.removeItem('token')
    this.route.navigate(['/login'])

  }

  getToken(){
    return localStorage.getItem('token')
  }
}
