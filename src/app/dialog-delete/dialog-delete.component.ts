import { Component, OnInit } from '@angular/core';
import { Book, Series } from '../series';
import { NbDialogRef } from '@nebular/theme';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent implements OnInit {
  constructor(
    private bookService: BooksService,
    public dialogRef: NbDialogRef<DialogDeleteComponent>
  ) {}
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token') as string;

    this.isBook = '_id' in this.data && 'title' in this.data;
  }
  token = '';
  data!: Series | Book;
  isBook = false;
  loading = false;
  get book() {
    return this.data as Book;
  }
  get serie() {
    return this.data as Series;
  }
  apagarData() {
    this.loading = true;
    if (this.isBook) {
      this.deleteBook(this.book).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close({
            delete: true,
            type: 'livro',
            id: this.book._id,
          });
        },
        error: () => {
          this.loading = false;
          this.dialogRef.close({ delete: false });
        },
      });
    } else {
      this.deleteColection(this.serie).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close({
            delete: true,
            type: 'serie',
            name: this.serie.series,
          });
        },
        error: () => {
          this.loading = false;
          this.dialogRef.close({ delete: false });
        },
      });
    }
  }
  deleteBook(book: Book) {
    return this.bookService.deleteBook({ ids: [book._id] }, this.token);
  }
  deleteColection(serie: Series) {
    return this.bookService.deleteBook(
      { ids: serie.books.map((el) => el._id) },
      this.token
    );
  }
}
