import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private menuService: NbMenuService, private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLogged = !!sessionStorage.getItem('token');
      }
    });
    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Dashboard') {
        this.router.navigate(['/dashboard']);
      } else if (event.item.title === 'Sair') {
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    });
    const token = sessionStorage.getItem('token');
    if (token) this.isLogged = true;
  }
  isLogged = false;
  items = [
    {
      title: 'Dashboard',
    },
    { title: 'Sair' },
  ];
}
