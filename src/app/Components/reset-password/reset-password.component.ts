import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router} from '@angular/router';
import { ConfirmedValidator } from '../../confirmvalidator';
import {RestApiService} from '../../Shared/rest-api-service'
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  Passwordform: FormGroup;
  pwdsubmitted = false;

  emailData:any;
  id:any;

  constructor(private formBuilder: FormBuilder,private route:Router,public router: ActivatedRoute, private auth:RestApiService) { 
    
    this.emailData = this.route.getCurrentNavigation().extras.state;
    console.log(this.emailData);
    localStorage.setItem("token",'');
    this.router.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      console.log(this.id);
  });

  }

  ngOnInit(): void {
    this.Passwordform = this.formBuilder.group({
      newpwd: ['', [Validators.required, Validators.minLength(4)]],
      cnfrmpwd: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('newpwd', 'cnfrmpwd')
    });
  }

onSendPwd(){
  this.pwdsubmitted = true;
  const val = this.Passwordform.value
  const Getdata ={
    "newPass":val.newpwd,
    "resetLink":this.id
  }
  if (this.Passwordform.invalid) {
    return;
  }
  console.log(Getdata);

  this.auth.forgotPassword(Getdata).subscribe(res =>{
    console.log("pwd changed successfully",res);
    this.route.navigate(['/login'])

  })


}

onCancel(){
 this.route.navigate(['/login'])
}


}
