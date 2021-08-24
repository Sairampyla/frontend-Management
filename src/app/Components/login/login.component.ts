import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';
import {RestApiService} from '../../Shared/rest-api-service';
import { SocialAuthService, GoogleLoginProvider,FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';



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
  isfieldTextType: boolean;
  rememberme: any = false;
  data:any=[];
  @Input() loginUserData = {email:"",password:""};

  @Input() isGooglePic:boolean = true;

  googleUser: SocialUser;
  fbUser:SocialUser;
  isLoggedin: boolean = null;
  isLoading: boolean = false;

 // @Input() set isGooglePic(isGooglePic: boolean)

  

 // @Output() informParent = new EventEmitter();

  
  constructor(private route:Router,private _servc:AuthService,
    private auth:RestApiService, private socialAuthService: SocialAuthService,
      private fb: FormBuilder,private spinner: NgxSpinnerService) {
        
   //keep me logged in 
   let userName = Cookie.get('userEmail')
   let remembermee = Cookie.get('rememberMe')

 if (userName && remembermee ) {
 
      this.route.navigate(['/user-list'])
  }
 else{
   localStorage.clear();
 this.route.navigate(['/login'])
 }

       }

  ngOnInit(): void {
    this.forgotPwdform = this.fb.group({
      foremail: [''],
      
    // }, {
    //   validator: ConfirmedValidator('newpwd', 'cnfrmpwd')
    });

    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = (user != null);
    // });

    this.socialAuthService.authState.subscribe((guser:any)=>{
         
      this.googleUser = guser;
    })
    this.socialAuthService.authState.subscribe((fbuser:any)=>{
         
      this.fbUser = fbuser;
    })
  }

  loginData(){
           this.isLoading = true;
           this.spinner.show();
     this._servc.loginUser(this.loginUserData).subscribe((res:any) =>{
       if(res.success == true){
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.isLoading = false;
      }, 5000);
         if(this.rememberme == true){
           console.log("remeber true");
           
          localStorage.setItem('token',res.token)
          console.log(res,"response");
          localStorage.setItem("username",res.fetchedUser.name)
          localStorage.setItem("email",res.fetchedUser.email)
         localStorage.setItem("id",res.fetchedUser._id)
         Cookie.set('userEmail', this.loginUserData.email,365);
         Cookie.set('userPassword',this.loginUserData.password,365 );
         Cookie.set('rememberMe',this.rememberme,365);
         Cookie.set("cookie-key", "cookie-value", 365);
   
          this.route.navigate(['/user-list'])
  
         }else if(this.rememberme == false){
          console.log("remember false");
           
          Cookie.deleteAll();
          localStorage.setItem('token',res.token)
          console.log(res,"response");
          localStorage.setItem("username",res.fetchedUser.name)
          localStorage.setItem("email",res.fetchedUser.email)
         localStorage.setItem("id",res.fetchedUser._id)
   
          this.route.navigate(['/user-list'])
         }else if(this.rememberme == true || this.loginUserData.email !=Cookie.get('userEmail') || this.loginUserData.password !=Cookie.get('userPassword')){
          console.log("remeber 3rd case");
           
          Cookie.deleteAll();
                     Cookie.set('userEmail', this.loginUserData.email, 365);
                     Cookie.set('userPassword',this.loginUserData.password , 365);
                     Cookie.set('rememberMe',this.rememberme, 365);
                     Cookie.set("cookie-key", "cookie-value", 365);
         }
       }else if(res.success == false){
         
       }
    
     },
   
     err =>{
       this.spinner.hide();
       this.isLoading = false;
      window.alert("invalid credentials")

     }
    
     
     )
    // console.log('login success');
    // this.route.navigate(['/user-list'])
  }

  // onGoto(){
  //   this.route.navigate(['/user-create'])
  // }
  
  // Switching method 
toggleFieldTextType() {
  this.isfieldTextType = !this.isfieldTextType
}
  ResetPwd(){
  this.pwdForm = true;
  this.mainForm = false;

  }
  onCancel(){
    this.pwdForm = false;
    this.mainForm = true;
    this.successmsg = false;
    this.errormsg = false;
    this.forgotPwdform.reset();
  }
  onSendEmail(){
    const val = this.forgotPwdform.value
    console.log(val,"value email");
    
    const data = {
      "email": val.foremail
    }
    this.isLoading = true;
    this.spinner.show();

    if(this.forgotPwdform.valid){
      this.auth.getEmaillink(data).subscribe((res:any)=>{
          console.log(res,"response occured...");
          this.data = res;
        //   setTimeout(() => {
        //     /** spinner ends after 5 seconds */
        //     this.spinner.hide();
        //     this.isLoading = false;
        // },2000);
          if(res.status == 200){
            this.successmsg = true;
            this.spinner.hide();
            this.isLoading = false;
          }else if(res.status == 401){
             this.errormsg = true;
             this.spinner.hide();
             this.isLoading = false;
          }
            
            // setTimeout(() => {
            //   this.successmsg = false;
            // }, 3000);
          // setTimeout(() => {
          //    this.mainForm = true;
          //  this.pwdForm = false;
          // }, 1000);
      })
    }else{
      console.log("error occured..!");
      
    }
  }

  onGmaillogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x:any)=>{

      console.log(x,"data from Google...")
      this.isLoading = true;
        this.spinner.show();
      this.auth.googleLogin({name:x.name,
        googleId:x.id,files:x.photoUrl,email:x.email}).subscribe((res:any)=>{
        //  this.isGooglePic = false;  this.isLoading = true;
        

      //   setTimeout(() => {
      //     /** spinner ends after 5 seconds */
      //     this.spinner.hide();
      //     this.isLoading = false;
      // }, 5000);
          console.log(res,"response");
          if(res['success']){
            this.spinner.hide();
            this.isLoading = false;
            localStorage.setItem('token',res['token'])
            localStorage.setItem("username",res.fetchedUser.name)
            this.route.navigate(['/user-list'])
          }else{
            alert("login not occured");
          }
        })
    })
   
        
  }

  onFblogin(){
  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((y:any)=>{
   // console.log(fbuser,"fb user");
   this.isLoading = true;
   this.spinner.show();
    this.auth.facebookLogin({name:y.name,
    fbId:y.id,files:y.photoUrl}).subscribe((res:any)=>{
      console.log(res,"response");
      if(res['success']){
        localStorage.setItem('token',res['token'])
        this.route.navigate(['/user-list'])
      }else{
        alert("login not occured");
      }
    })
  })
 
  }

  newUser(){
    this.route.navigate(['/newUser'])
  }

}
