import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';
import { Book, Series } from '../series';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UsersService,
    private bookService: BooksService
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
  addNewBook() {
    //ir para pagina de adicionar novo Livro
  }
  // nomeLivro = '';
  // autorLivro = '';
  // addNew() {
  //   if (!this.nomeLivro || !this.autorLivro) return;
  //   this.bookService
  //     .addNew({ title: this.nomeLivro, author: this.autorLivro }, this.token)
  //     .subscribe((book) => {
  //       this.books.unshift(book);
  //       this.nomeLivro = '';
  //       this.autorLivro = '';
  //     });
  // }
  // deleteBook(id: string) {
  //   this.bookService.deleteBook(id, this.token).subscribe(() => {
  //     const ind = this.books.findIndex((b) => b.series === id);
  //     this.books.splice(ind, 1);
  //   });
  // }
}
