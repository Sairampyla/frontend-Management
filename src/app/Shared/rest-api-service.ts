

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  formdata : Employees;
 
 private _url:string = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
   
  getEmployees(): Observable<Employees> {
    return this.http.get<Employees>(this._url +'/employees');
  }

  createEmployee(formdata :Employees): Observable<Employees> {
    return this.http.post<Employees>(this._url +'/employees', JSON.stringify(formdata), this.httpOptions);
  }

  getEmployee(id): Observable<Employees> {
    return this.http.get<Employees>( this._url +'/employees/'+ id);
  }

  updateEmployee(id, employee): Observable<Employees> {
    return this.http.put<Employees>(this._url +'/employees/' + id,
    JSON.stringify(employee), this.httpOptions);
  }
  
  deleteEmployee(id) {
    return this.http.delete<Employees>(this._url +'/employees/' + id);
  }

  //forgot-pwd link
 getEmaillink(data){
  return this.http.put(this._url+'/employees/forgot-passwordlink',data,this.httpOptions)
 }

  //change-pasword
  changePassword(data){
 
    return this.http.put(this._url+'/employees/changePassword',data,this.httpOptions)
  }
}
