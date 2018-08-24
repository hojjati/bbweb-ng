import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedModule } from '@app/shared/shared.module';
import { User } from '@app/domain/users/user.model';

import {
  RootStoreState,
  AuthStoreActions,
  AuthStoreSelectors
} from '@app/root-store';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private user: User;
  private isUserAuthenticated: boolean;
  private hasRoles: boolean;
  private allowCollection: boolean;
  private shippingAllowed: boolean;
  private adminAllowed: boolean;

  constructor(private store$: Store<RootStoreState.State>) {
  }

  ngOnInit() {
    this.store$
      .select(AuthStoreSelectors.selectAuthUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        this.user = user;
        if (user !== null) {
          this.isUserAuthenticated = true;
          this.hasRoles = this.user.hasRoles();
          this.allowCollection = this.user.hasSpecimenCollectorRole();
          this.shippingAllowed = this.user.hasShippingUserRole();
          this.adminAllowed = this.user.hasAdminRole();
        } else {
          this.isUserAuthenticated = false;
          this.hasRoles = false;
          this.allowCollection = false;
          this.shippingAllowed = false;
          this.adminAllowed = false;
        }
      });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
