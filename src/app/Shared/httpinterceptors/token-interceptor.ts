
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { AuthService } from '../auth.service';




@Injectable({
  providedIn:'root'
})

export class TokenInterceptor implements HttpInterceptor{

  constructor(private _servc:AuthService){}

  intercept(req,next){
    let inject = this._servc.getToken()
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${inject}`
      }
    })
    return next.handle(tokenizedReq)
  }
  

}