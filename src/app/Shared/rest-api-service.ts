

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employees } from './user.model';
import { SocialAuthService} from 'angularx-social-login';
import {environment} from '../../environments/environment';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  formdata : Employees;
   token: any = localStorage.getItem('token')
 
//private _url:string = environment.Apiurl;
private _url:string = 'http://localhost:8080'
  
 
  httpOptions = {
    
    headers: new HttpHeaders({
      // "Content-Type": "multipart/form-data",
      "Accept": 'application/json',
      // "enctype": "multipart/form-data"
      "Access-Control-Allow-Origin": "*",
      "x-access-token":this.token
      
    })
  }

  constructor(private http: HttpClient,private route:Router,
    private socialLogins:SocialAuthService) { }
   
  // getEmployees(): Observable<Employees> {
  //   return this.http.get<Employees>(this._url +'/employees',this.httpOptions);
  // }

  // createEmployeee(data): Observable<Employees> {
  //   return this.http.post<Employees>(this._url +'/employees', data, this.httpOptions);
  // }

  // getEmployee(id): Observable<Employees> {
  //   return this.http.get<Employees>( this._url +'/employees/'+ id);
  // }

  // updateEmployeee(id, employee): Observable<Employees> {
  //   return this.http.put<Employees>(this._url +'/employees/' + id,
  //   JSON.stringify(employee), this.httpOptions);
  // }
  
  // deleteEmployeee(id) {
  //   return this.http.delete<Employees>(this._url +'/employees/' + id);
  // }



  getData(): Observable<Employees> {
    return this.http.get<Employees>(this._url + '/employees',this.httpOptions);
  }

  createEmployee(data) {
    return this.http.post<any>(this._url + '/employees',data,this.httpOptions);
  }

  getSingleData(id) {
    const data = {
      "id":id
     
    }
    return this.http.get<any>(this._url + '/employees/' + data,this.httpOptions)
  }

  updateEmployee(data,id){
    return this.http.put<any>(this._url + '/employees/' +data, id, this.httpOptions);
  }

  deleteEmployee(id) {
    return this.http.delete<Employees>(this._url + '/employees/' + id);
  }
  

  //forgot-pwd link
 getEmaillink(data){
  return this.http.put(this._url+'/employees/forgot-passwordlink',data,this.httpOptions)
 }
// getEmaillink(data){
//   return this.http.put('http://localhost:8080/employees/forgot-passwordlink',data,this.httpOptions)
//  }

  //forgot-pasword
  forgotPassword(data){
 
    return this.http.put(this._url+'/employees/changePassword',data,this.httpOptions)
  }

  //change-password
  changePassword(data,id){
    return this.http.put(this._url + '/employees/newPassword/' +data, id, this.httpOptions);
  }

  //login-with-Google
  // googleLogin(){
  //   return this.http.get(this._url+'/employees/google')

  // }

  //re-direct google
  reDirectGoogle(){
    return this.http.get(this._url+'/employees/google/redirect',this.httpOptions)
  }


  //login-Google
 googleLogin(data){
   return this.http.post(this._url+'/employees/Google',data)
 }

 //login-Fb
 facebookLogin(data){
  return this.http.post(this._url+'/employees/Facebook',data)
}

 //log-off
 onLogoff(){
 //this.socialLogins.signOut();
  localStorage.clear();
  sessionStorage.clear();
  Cookie.deleteAll();

  this.route.navigate(['/login'])
}

}
