

import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';

export class UncompletedRegisterUserGuard implements CanDeactivate<LoginComponent> {
  canDeactivate(component: LoginComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
    console.log('UncompletedRegisterUserGuard is checking');
    console.log(route.params);
    console.log(state.url);
    return component.canDeactivate() || window.confirm('Are you sure?');
  }
}
