import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad, CanActivateChild {
    constructor(private router: Router, private adminService: AdminService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.check();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.check();
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.check();
    }

    check() {
        return this.adminService
            .checkToken()
            .toPromise()
            .then(() => {
                return true;
            })
            .catch(() => {
                this.router.navigate(['/home']);
                try {
                    localStorage.removeItem('token');
                } catch (error) {}
                try {
                    localStorage.removeItem('siteID');
                } catch (error) {}
                return false;
            });
    }
}
