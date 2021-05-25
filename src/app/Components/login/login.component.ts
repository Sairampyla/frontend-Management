import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';
import {RestApiService} from '../../Shared/rest-api-service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pwdForm:boolean = false;
  mainForm:boolean = true;
  forgotPwdform: FormGroup;
  forsubmitted:boolean = false;
  errormsg:boolean = false;
  successmsg:boolean = false;
  data:any=[];
  @Input() loginUserData = {email:"",password:""}
  
  constructor(private route:Router,private _servc:AuthService,
    private auth:RestApiService,
      private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.forgotPwdform = this.fb.group({
      foremail: [''],
      
    // }, {
    //   validator: ConfirmedValidator('newpwd', 'cnfrmpwd')
    });
  }
  loginData(){
     this._servc.loginUser(this.loginUserData).subscribe( res =>{
       localStorage.setItem('token',res.token)
       console.log(res,"response");
       localStorage.setItem("username",res.fetchedUser.name)

       this.route.navigate(['/user-list'])
     },
     err => window.alert(err+"invalid credentials")
     
     )
    // console.log('login success');
    // this.route.navigate(['/user-list'])
  }
  onGoto(){
    this.route.navigate(['/user-create'])
  }
  ResetPwd(){
  this.pwdForm = true;
  this.mainForm = false;

  }
  onCancel(){
    this.pwdForm = false;
    this.mainForm = true;
    this.forgotPwdform.reset();
  }
  onSendEmail(){
    const val = this.forgotPwdform.value
    console.log(val,"value email");
    
    const data = {
      "email": val.foremail
    }
    if(this.forgotPwdform.valid){
      this.auth.getEmaillink(data).subscribe(res=>{
        
          console.log(res,"response email sent successfully");
          this.data = res;
            this.successmsg = true;
            setTimeout(() => {
              this.successmsg = false;
            }, 3000);
          setTimeout(() => {
             this.mainForm = true;
           this.pwdForm = false;
          }, 1000);
         
      

      })
    }
      
      
    
  }

}
