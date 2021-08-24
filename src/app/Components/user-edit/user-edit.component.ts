import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../../Shared/rest-api-service';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  employeeData: any = {};
  mobNumberPattern="^((\\+91-?)|0)?[0-9]{10}$";
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
    ) { }
  ngOnInit() {
    this.restApi.getEmployee(this.id)
      .subscribe(data => this.employeeData = data);
  }

  updateEmployee() {
    if(window.confirm('Are you sure you want to update?')) {
      this.restApi.updateEmployee(this.id, this.employeeData)
        .subscribe(data => {
          this.router.navigate(['/user-list']),(window.alert('employee updated'))
        })
    }
  }

  onGoto(){
    this.router.navigate(['/user-list'])
  }

  

}
