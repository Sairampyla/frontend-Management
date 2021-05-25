import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';
import {RestApiService} from '../../Shared/rest-api-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  Employee: any = [];
  userName =  localStorage.getItem("username")

  constructor(private restApi:RestApiService,public _servc:AuthService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }
   
  loadEmployees() {
    return this.restApi.getEmployees().subscribe( data => this.Employee = data);
  }

  deleteEmployee(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.restApi.deleteEmployee(id)
        .subscribe(data => this.loadEmployees()),(window.alert('employee deleted'));
    }
  }
}
