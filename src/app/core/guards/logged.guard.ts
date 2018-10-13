import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor( private router:Router ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem(SystemConstants.CURRENT_USER)){
        this.router.navigate([UrlConstants.DASHBOARD]);
      }else{
        return true;
      }
  }
}
