import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserModel} from '../../models/user.model';
import {Auth} from '../../services/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  user = new UserModel();
  error = 0;

  constructor(private auth: Auth, private router: Router) {
  }

  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.auth.SignIn(this.user);
    if (isValidUser) this.router.navigate(['/']);
    else this.error = 1;
  }
}
