import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';
import { Book, Series } from '../series';
import { BooksService } from '../books.service';
import { NbDialogService } from '@nebular/theme';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UsersService,
    private bookService: BooksService,
    private dialogService: NbDialogService
  ) {}
  user!: User;
  series!: Series[];
  books!: Book[];
  token!: string;
  loading = false;
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.token = token;
    this.getBooks();
  }
  getBooks() {
    this.loading = true;
    this.userService.getMe(this.token).subscribe(({ user }) => {
      this.user = user;
      this.bookService.getOwner(this.user._id).subscribe((series) => {
        this.series = series.filter((serie) => serie.series);
        this.books = series.find((serie) => !serie.series)?.books || [];
        this.loading = false;
      });
    });
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  deleteCard(data: Series | Book) {
    const dialogRef = this.dialogService.open(DialogDeleteComponent, {
      context: { data },
    });
    dialogRef.onClose.subscribe((data) => {
      if (!data || !data.delete) return;
      if (data.type === 'livro') {
        const ind = this.books.findIndex((el) => el._id === data.id);
        this.books.splice(ind, 1);
      } else if (data.type === 'serie') {
        const ind = this.series.findIndex((el) => el.series === data.name);
        this.series.splice(ind, 1);
      }
    });
  }
}
