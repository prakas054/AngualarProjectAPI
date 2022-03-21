import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    debugger;
    if(sessionStorage.getItem("AUTH_TOKEN") == null){
        this.router.navigateByUrl("", )
        return false;
    }
    else
    {
      return true;
    }
    
  }
}
