import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './shared/authentication-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private AuthService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    const redirectUrl = route['_routerState']['url'];

    if (this.AuthService.isLoggedIn) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(['/login'], {
        queryParams: {
          redirectUrl,
        },
      })
    );

    return false;
  }
}
