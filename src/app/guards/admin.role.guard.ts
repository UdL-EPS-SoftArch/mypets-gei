import { Injectable } from '@angular/core';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../error-handler/error-message.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private authentication: AuthenticationBasicService,
              private errorMessageService: ErrorMessageService) {
  }

  canActivate(): boolean {
    if (!this.authentication.isLoggedIn()) {
      this.errorMessageService.showErrorMessage(
        'You should be logged in as a shelter volunteer to perform this action');
      return false;
    }
    if (!this.authentication.getCurrentUser().getRoles().includes('admin')) {
      this.errorMessageService.showErrorMessage(
        'You should be a admin to perform this action');
      return false;
    }
    return true;
  }
}
