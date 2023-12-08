import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);

  if (AuthService.isLoggedIn()) {
    return true
  }
  else {
    router.navigate(['/']);
  }
  return false
};
