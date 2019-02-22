import { HideSpinner, ShowSpinner } from '@app/core/decorators';
import { Action } from '@ngrx/store';
import { UserCounts } from '@app/domain/users/user-counts.model';
import { SearchParams, PagedReply } from '@app/domain';
import { User } from '@app/domain/users';

interface UserUpdateRequestPayload {
  user: User;
  attributeName: string;
  value: string;
}

export enum UserActionTypes {
  GetUserCountsRequest = '[User] Get User Count Request',
  GetUserCountsSuccess = '[User] Get User Count Success',
  GetUserCountsFailure = '[User] Get User Count Failure',

  SearchUsersRequest = '[User] Search Users Request',
  SearchUsersSuccess = '[User] Search Users Success',
  SearchUsersFailure = '[Users] Search Users Failure',

  AddUserRequest = '[User] Add User Request',
  AddUserSuccess = '[User] Add User Success',
  AddUserFailure = '[User] Add User Failure',

  GetUserRequest = '[User] Get User Request',
  GetUserSuccess = '[User] Get User Success',
  GetUserFailure = '[User] Get User Failure',

  UpdateUserRequest = '[User] Update User Request',
  UpdateUserSuccess = '[User] Update User Success',
  UpdateUserFailure = '[User] Update User Failure',

}

@ShowSpinner()
export class GetUserCountsRequest implements Action {
  readonly type = UserActionTypes.GetUserCountsRequest;
}

@HideSpinner(UserActionTypes.GetUserCountsRequest)
export class GetUserCountsSuccess implements Action {
  readonly type = UserActionTypes.GetUserCountsSuccess;

  constructor(public payload: { userCounts: UserCounts }) { }
}

@HideSpinner(UserActionTypes.GetUserCountsRequest)
export class GetUserCountsFailure implements Action {
  readonly type = UserActionTypes.GetUserCountsFailure;

  constructor(public payload: { error: any }) { }
}

export class SearchUsersRequest implements Action {
  readonly type = UserActionTypes.SearchUsersRequest;

  constructor(public payload: { searchParams: SearchParams }) { }
}

export class SearchUsersSuccess implements Action {
  readonly type = UserActionTypes.SearchUsersSuccess;

  constructor(public payload: { pagedReply: PagedReply<User> }) { }
}

export class SearchUsersFailure implements Action {
  readonly type = UserActionTypes.SearchUsersFailure;

  constructor(public payload: { error: any }) { }
}

@ShowSpinner()
export class AddUserRequest implements Action {
  readonly type = UserActionTypes.AddUserRequest;

  constructor(public payload: { user: User }) { }
}

@HideSpinner(UserActionTypes.AddUserRequest)
export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.AddUserSuccess;

  constructor(public payload: { user: User }) { }
}

@HideSpinner(UserActionTypes.AddUserRequest)
export class AddUserFailure implements Action {
  readonly type = UserActionTypes.AddUserFailure;

  constructor(public payload: { error: any }) { }
}

@ShowSpinner()
export class GetUserRequest implements Action {
  readonly type = UserActionTypes.GetUserRequest;

  constructor(public payload: { slug: string }) { }
}

@HideSpinner(UserActionTypes.GetUserRequest)
export class GetUserSuccess implements Action {
  readonly type = UserActionTypes.GetUserSuccess;

  constructor(public payload: { user: User }) { }
}

@HideSpinner(UserActionTypes.GetUserRequest)
export class GetUserFailure implements Action {
  readonly type = UserActionTypes.GetUserFailure;

  constructor(public payload: { error: any }) { }
}

@ShowSpinner()
export class UpdateUserRequest implements Action {
  readonly type = UserActionTypes.UpdateUserRequest;

  constructor(public payload: UserUpdateRequestPayload) { }
}

@HideSpinner(UserActionTypes.UpdateUserRequest)
export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserSuccess;

  constructor(public payload: { user: User }) { }
}

@HideSpinner(UserActionTypes.UpdateUserRequest)
export class UpdateUserFailure implements Action {
  readonly type = UserActionTypes.UpdateUserFailure;

  constructor(public payload: { error: any }) { }
}

export type UserActions =
  GetUserCountsRequest
  | GetUserCountsSuccess
  | GetUserCountsFailure
  | SearchUsersRequest
  | SearchUsersSuccess
  | SearchUsersFailure
  | AddUserRequest
  | AddUserSuccess
  | AddUserFailure
  | GetUserRequest
  | GetUserSuccess
  | GetUserFailure
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFailure;
