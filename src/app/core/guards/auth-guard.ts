import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../features/auth/services/auth';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isloggedIn) return true;
  else {
    router.navigate(['/login']);
    return false;
  }
};
