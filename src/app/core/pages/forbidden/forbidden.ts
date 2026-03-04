import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Auth} from '../../../features/auth/services/auth';

@Component({
  selector: 'app-forbidden',
  imports: [],
  templateUrl: './forbidden.html',
})
export class Forbidden {
  constructor(private router: Router, public authService: Auth) {
  }

  goHome() {
    this.router.navigate(['/products']);
  }

  goLogin() {
    if (this.authService.isloggedIn) {
      this.authService.logout(); // déconnecte et redirige vers /login
    }
  }
}


