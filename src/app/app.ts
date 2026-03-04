import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Auth} from './features/auth/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pmsApp');

  constructor(public authService: Auth, public router: Router) {
  }

  ngOnInit() {
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isloggedIn') !;
    loggedUser = localStorage.getItem('loggedUser') !;
    if (isloggedin != "true" || !loggedUser) this.router.navigate(['/login']); else this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout() {
    this.authService.logout();
  }
}
