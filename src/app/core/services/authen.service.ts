import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { catchError,map,tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UrlConstants } from '../common/url.constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  public loginUserId : number;
  constructor(
    private http:HttpClient
  ) { }

  login(username:string, password:string) :Observable<Boolean>{
    return this.http.post(SystemConstants.BASE_API + 'login',JSON.stringify({username,password}),httpOptions
    ).pipe( 
      map((res) => {
        // Đăng nhập thành công
        if(res){
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER,<string>res);
          localStorage.setItem(SystemConstants.ViewDetailUserId , <string>res);
          return true;
        }
      }
      )
    );
  }
  logout():Observable<Boolean>{
    let userId = localStorage.getItem(SystemConstants.CURRENT_USER);
    console.log(JSON.stringify({userId}));
    return this.http.put(SystemConstants.BASE_API + 'logout',{userId},httpOptions)
    .pipe( 
      map((res) => {
        if(res){
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          return true;
        }
        return false;
      }
      )
    );
  }
}
