import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private usersService: UsersService, private router: Router) {}
  username = '';
  password = '';
  showPass = false;
  loading = false;
  login() {
    if (!this.username || !this.password)
      return alert('Erro ao realizar login');
    this.loading = true;
    this.usersService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: ({ token }) => {
          sessionStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Erro ao realizar login');
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
