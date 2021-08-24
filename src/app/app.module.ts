import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';

import { UserListComponent } from './Components/user-list/user-list.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';


import { AuthService } from './Shared/auth.service';
import { TokenInterceptor } from './Shared/httpinterceptors/token-interceptor';
import { AuthenticationGuard } from './authentication.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { UserCreateComponent } from './Components/user-create/user-create.component';
import { LoaderComponent } from './loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserEditComponent,
    ResetPasswordComponent,
    UserCreateComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [AuthService,AuthenticationGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '122393296105-jdtkso3qgdfif8e0hllc7o6696lt7auq.apps.googleusercontent.com'
              
            ),
            
          },
          {
            id:FacebookLoginProvider.PROVIDER_ID,
            provider:new FacebookLoginProvider(
              '333829878201733'
            )
          }
          
        ]
      } as SocialAuthServiceConfig,
      
    },
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
