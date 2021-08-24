import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';
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
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // Employee: any = [];
  

  // constructor(private restApi:RestApiService,public _servc:AuthService) { }

  // ngOnInit(): void {
  //   this.loadEmployees();
  // }
   
  // loadEmployees() {
  //   return this.restApi.getEmployees().subscribe( data => this.Employee = data);
  // }

  // deleteEmployee(id) {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     this.restApi.deleteEmployee(id)
  //       .subscribe(data => this.loadEmployees()),(window.alert('employee deleted'));
  //   }
  // }


  userName =  localStorage.getItem("username")
  logEmail =  localStorage.getItem("email")
  logId =  localStorage.getItem("id")
    Employee: any = [];
    Edit:any =[];
    taskForm:FormGroup;
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
  isLoading:boolean = false;
 
previewUrl:any = null;
state$: Observable<object>;
  
    constructor(public auth: RestApiService,public fb:FormBuilder,
      public actRoute: ActivatedRoute,public http:HttpClient, private socialLogins:SocialAuthService,
      public router: Router,private spinner: NgxSpinnerService) {
       
     }
  
    ngOnInit() {
      this.taskForm = this.fb.group({
        name:['',[Validators.required]],
        email:['',[Validators.required]],
        phone:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        gender:['',Validators.required],
        joindate:['',Validators.required],
        country:['',Validators.required],
        password:['',Validators.required],
        storeLogo : [null],
      });
      this.forgotPwdform = this.fb.group({
        pwdChange: [''],
      });
      this.state$ = this.actRoute.paramMap
      .pipe(map(() => window.history.state))
      this.loadEmployees();
      console.log(this.Employee,"names");
      
    }

    //password-change
    onChangePwd(){
      this.gridPanel = false;
      this.ispwdForm = true;

    }

    //password-change submit
    onChangePwdSend(){

      this.submitted = true;
      if (this.forgotPwdform.invalid) {  
        
        return; 
             
      }else{
     let val = this.forgotPwdform.value;
     let obj ={
       "password":val.pwdChange
     }
     console.log(obj,"password change");

     
       this.auth.changePassword(this.logId,obj).subscribe((res:any)=>{
         console.log(this.logId,"id")
          console.log(res,"response occured...");
          if(res.status == 200){
            this.issuccessmsg = true;
          }else if(res.status == 401){
             this.iserrormsg = true;
          }
      this.loadEmployees();

       })

    
      }

    }
  

    //img-upload
    fileProgress(event) {
      this.fileData = <File>event.target.files[0]
      this.uploadedFileName = <File>event.target.files[0].name

      const file = (event.target as HTMLInputElement).files[0];
      this.taskForm.patchValue({
        storeLogo : file
      });

      this.taskForm.get('storeLogo').updateValueAndValidity();

      this.preview();
      console.log(this.uploadedFileName,"photo name");
}

  // const file = event.target.files[0];
//this.uploadedFileName = <File>event.target.files[0].name;
 
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

    //add-panel
    showaddpnl() {
      this.gridPanel = false;
      this.addEditPanel = true;
    
      this.subAddBtnActive  = true;
      this.subEditBtnActive = false; 
    
      this.taskForm.reset();
      this.submitted = false;
    }
  
    //edit-panel
    edit(x){
    console.log(this.logEmail,"email");
    console.log(this.userName,"name");
    
      if(this.logEmail === x.email){
        this.Edit = [];
        console.log("obj",x);
              this.gridPanel = false;
              this.addEditPanel = true;
              this.subAddBtnActive  = false;
              this.subEditBtnActive = true;
                this.editObj = x;
                console.log("id objj",this.editObj);
                let fileResponse = this.editObj.file;
                console.log(fileResponse,"file response");
                
                console.log(this.fileData,"file data");
        
                this.previewUrl = this.storeLogo + this.editObj.file
              
                   this.taskForm.get("name").setValue(x.name);
                  //  this.userName =  x.name;
                  //  console.log(this.userName,"usernmae");
                   
             this.taskForm.get("email").setValue(x.email);
             this.taskForm.get("phone").setValue(x.phone);
             this.taskForm.get("gender").setValue(x.gender);
             this.taskForm.get("joindate").setValue(x.joiningDate);
             this.taskForm.get("country").setValue(x.country);
             this.taskForm.get("password").setValue(x.password);
          
             
           }else{
            alert("you have no accecss to do this..")
           }
      }
 
  
     //cancel
  
     cancel(){
        this.ispwdForm = false;
      this.gridPanel = true;
     
      this.addEditPanel = false;
      this.subAddBtnActive = false;
      this.subEditBtnActive = false;
      this.action = '';
      this.taskForm.reset();
  
    }
  
  
    loadEmployees() {
     // this.isLoading = true;
     return this.auth.getData().subscribe( data => this.Employee = data);
   //   return this.restApi.getEmployees().subscribe( data => this.Employee = data);
    }
  
  
    deleteEmployee(id) {
 console.log(id,"id check..");
 
      if(this.logId === id){
        if (window.confirm('Are you sure you want to delete?')) {
          this.auth.deleteEmployee(id)
            .subscribe(data => this.loadEmployees())
            this.router.navigate(['/login'])
        }
      }else{
        alert("you have no accecss to do this..")
       
      }
     
    }
  
    
     
    //Form Submit
    onSubmit() {
      this.submitted = true;
      if (this.taskForm.invalid) {  
        
        return; 
             
      }
     
      if(this.subAddBtnActive){      
          // this.isLoading = true;s
         console.log("this is add");
         
       
                //   const formValue = this.taskForm.value;
                //  const  formData ={
                //        "name":formValue.name,
                //        "email":formValue.email,
                //        "password":formValue.password,
                //        "phone":formValue.phone,
                //        "gender":formValue.gender,
                //        "country":formValue.country,
                //        "joiningDate":formValue.joindate,
                //        "file":this.uploadedFileName
                //   }
                //   console.log(formData,"data from add");
                  
                var formData: any = new FormData(); 
                formData.append("name",this.taskForm.get('name').value),
                formData.append("email",this.taskForm.get('email').value),
                formData.append("phone",this.taskForm.get('phone').value),
                formData.append("password",this.taskForm.get('password').value),
                formData.append("gender",this.taskForm.get('gender').value),
                formData.append("country",this.taskForm.get('country').value),
                formData.append("joiningDate",this.taskForm.get('joindate').value)
              formData.append("file",this.fileData);
              console.log(this.fileData,"file dataa");
              
                        

                         //const formData = new FormData();
                          
    // for (var i = 0; i < req.files.length; i++) {
    //   reqFiles.push(req.files[i].filename)
    // }
            
// for (let i = 0; i < this.uploadedFileName.length; i ++) {

//     formData.append('file', this.uploadedFileName[i]);
// }
console.log(...formData);
     this.auth.createEmployee(formData).subscribe(x => this.loadEmployees())
 // this.http.post<any>("http://localhost:8080/employees",formData).subscribe(x=>{
   
   
    
  
          this.gridPanel = true;
          this.addEditPanel =false;
          this.subEditBtnActive = false;
        
      }else if(this.subEditBtnActive){
          console.log("This is Edit...!");
        
  
      //  const formValue = this.taskForm.value;
        var formData: any = new FormData(); 
      //  formData.append( "_id",this.editObj._id),
        formData.append("name",this.taskForm.get('name').value),
        formData.append("email",this.taskForm.get('email').value),
        formData.append("password",this.taskForm.get('password').value)
        var check = formData.append("password",this.taskForm.get('password').value);
        console.log(check,"pwd check");
        
        formData.append("phone",this.taskForm.get('phone').value),
        formData.append("gender",this.taskForm.get('gender').value),
        formData.append("country",this.taskForm.get('country').value),
        formData.append("joiningDate",this.taskForm.get('joindate').value);

          if(this.uploadedFileName !=""){
      formData.append("file",this.fileData);
      console.log(this.fileData,"file dataa new");
         }else{
           formData.append('file',this.editObj.file)
           console.log(this.editObj.file,"file dataa edit obj");
         }

        // formData.append("file",this.fileData);
     
        // if(this.uploadedFileName != ""){
        //   formData.append("file",this.uploadedFileName);
        // }else if(this.editStores.si_logo != null){
        //   formData.append("file",this.editStores.si_logo);
        // }
     

        // const data = {
        //       "_id":this.editObj._id,
        //       "name":formValue.name,
        //       "email":formValue.email,
        //       "phone":formValue.phone,
        //       "gender":formValue.gender,
        //       "country":formValue.country,
        //       "joiningDate":formValue.joindate,
              
        //  }

         console.log(formData,"data check");
         this.isLoading = true;
         this.spinner.show();
          this.auth.updateEmployee(this.editObj._id,formData).subscribe((x:any)=>{

            if(x.success == true){
              console.log("truee");
              setTimeout(() => {
              
                  this.isLoading = false;
                  this.spinner.hide();
                
                this.loadEmployees();
                this.gridPanel = true;
           this.addEditPanel = false;
           this.subEditBtnActive = false;
              },1000);
            
         

            }
            

          })
         
      }
  
    }
    
  
    onLogoff(){
    //  this.socialLogins.signOut();
    
      this.auth.onLogoff();
    }
  
  

}
