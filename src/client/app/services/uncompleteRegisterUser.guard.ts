import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {RegisterComponent} from '../components/register/register.component';

export class UncompletedRegisterUserGuard implements CanDeactivate<RegisterComponent> {
  canDeactivate(component: RegisterComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
    console.log('UncompletedRegisterUserGuard is checking');
    console.log(route.params);
    console.log(state.url);
    return component.canDeactivate() || window.confirm('Are you sure?');
  }
}
