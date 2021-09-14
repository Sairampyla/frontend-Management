import { Component, Input, OnInit } from '@angular/core';
import {RestApiService} from '../../Shared/rest-api-service';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { SocialAuthService} from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

 

  //@Input() employeeDetails = { name: '', email: '',password: '',joiningDate:'',country:'', phone:''}
  mobNumberPattern="^((\\+91-?)|0)?[0-9]{10}$";
 
  
  userName =  localStorage.getItem("username")
  logEmail =  localStorage.getItem("email")
  logId =  localStorage.getItem("id")
    Employee: any = [];
    Edit:any =[];
    taskFormm:FormGroup;
    forgotPwdform: FormGroup;
    gridPanel:boolean = true;
    addEditPanel:boolean = false;
    action : any = '';
    submitted = false;
    id = this.actRoute.snapshot.params['id'];
    editObj:any;
    public subAddBtnActive:boolean = false;
   public subEditBtnActive:boolean= false;
   public storeLogo = environment.storeLogo;
   fileData: File = null;
   uploadedFileName:any = "";
   isGooglePic:boolean;
   ispwdForm:boolean = false;
   iserrormsg:boolean = false;
  issuccessmsg:boolean = false;
 
isLoading: boolean = false;
previewUrl:any = null;

  
    constructor(public auth: RestApiService,public fb:FormBuilder,
      public actRoute: ActivatedRoute,public http:HttpClient, private socialLogins:SocialAuthService,
      public router: Router,private spinner: NgxSpinnerService) {
       
     }
  
    ngOnInit() {
      this.taskFormm = this.fb.group({
        name:['',[Validators.required]],
        email:['',[Validators.required,Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$")]],
        phone:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        gender:['',Validators.required],
        joindate:['',Validators.required],
        country:['',Validators.required],
        password:['',Validators.required],
        storeLogo : [null],
      });
     // console.log(this.Employee,"names");
      
    }

   

  

    //img-upload
    fileProgress(event) {
      this.fileData = <File>event.target.files[0]
      this.uploadedFileName = <File>event.target.files[0].name

      const file = (event.target as HTMLInputElement).files[0];
      this.taskFormm.patchValue({
        storeLogo : file
      });

      this.taskFormm.get('storeLogo').updateValueAndValidity();

      this.preview();
      console.log(this.uploadedFileName,"photo name");
}

 
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}

   
  
     //cancel
  
     cancel(){
    
      this.taskFormm.reset();
      this.router.navigate(['/']);
  
    }
    //Form Submit
    onSubmit() {
      this.submitted = true;
      if (this.taskFormm.invalid) {  
        
        return; 
             
      }
     
      else{      
          // this.isLoading = true;s
         console.log("this is add");
                var formData: any = new FormData(); 
                formData.append("name",this.taskFormm.get('name').value),
                formData.append("email",this.taskFormm.get('email').value),
                formData.append("phone",this.taskFormm.get('phone').value),
                formData.append("password",this.taskFormm.get('password').value),
                formData.append("gender",this.taskFormm.get('gender').value),
                formData.append("country",this.taskFormm.get('country').value),
                formData.append("joiningDate",this.taskFormm.get('joindate').value)
              formData.append("file",this.fileData);
              console.log(this.fileData,"file dataa");
            console.log(...formData);
            this.isLoading = true;
            this.spinner.show();
            this.auth.createEmployee(formData).subscribe((x:any) =>{
             console.log(x,"response");
              if(x.success == true){
             
                setTimeout(() => {
                  this.isLoading = false;
                  this.spinner.hide();
                 }, 2000);
                 alert("register done successfully...pls login to continue...")
                
                 this.router.navigate(['/login'])
              }
              else{
                alert("error occured");
                this.isLoading = false;
                this.spinner.hide();
              }

            })
         
        
      }
    }
    
  
    
  

  
}
