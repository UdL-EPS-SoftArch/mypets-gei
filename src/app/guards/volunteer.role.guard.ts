import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@Injectable({
  providedIn: 'root'
})
export class ShelterVolunteerGuard implements CanActivate {

  constructor(
    private authentication: AuthenticationBasicService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authentication.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRoles = this.authentication.getCurrentUser().getRoles();
    if (userRoles.includes('volunteer')) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
