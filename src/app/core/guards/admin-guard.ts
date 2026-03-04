import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../features/auth/services/auth';

export const adminGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAdmin()) return true;
  else {
    router.navigate(['/forbidden']);
    return false;
  }
};


