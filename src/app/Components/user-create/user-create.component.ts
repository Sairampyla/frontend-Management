import { Component, Input, OnInit } from '@angular/core';
import {RestApiService} from '../../Shared/rest-api-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

 

  @Input() employeeDetails = { name: '', email: '',password: '',joiningDate:'',country:'', phone:''}
  mobNumberPattern="^((\\+91-?)|0)?[0-9]{10}$";
  constructor(public restApi: RestApiService, public router: Router) { }
  ngOnInit() {
  }
  onSubmit() {
    // this.restApi.createEmployee(this.employeeDetails)
    //   .subscribe((data: {}) => {
    //     this.router.navigate(['/user-list'])
    //   })
        this.restApi.createEmployee(this.employeeDetails).subscribe(res => {console.log(res)
          if(res.success == true){
            localStorage.setItem('token',res.token)
            window.alert('Registration succedd')
            this.router.navigate(['/user-list'])
          }else{
            window.alert('mail already exists pls login...')
            this.router.navigate(['/login'])
          }
        })
  }
  onGoto(){
    this.router.navigate(['/login'])
  }
}
