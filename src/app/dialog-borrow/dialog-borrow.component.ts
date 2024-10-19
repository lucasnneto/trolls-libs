import { Component, ElementRef, ViewChild } from '@angular/core';
import { BooksService } from '../books.service';
import { NbDialogRef } from '@nebular/theme';
import { Book, Series } from '../series';

@Component({
  selector: 'app-dialog-borrow',
  templateUrl: './dialog-borrow.component.html',
  styleUrls: ['./dialog-borrow.component.scss']
})
export class DialogBorrowComponent {
  constructor(
    private bookService: BooksService,
    public dialogRef: NbDialogRef<DialogBorrowComponent>
  ) { }
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token') as string;

    this.isBook = '_id' in this.data && 'title' in this.data;
    if (this.isBook) {
      this.isBorrow = !!this.book.borrowedTo
    } else {
      this.isBorrow = !!this.serie.books[0].borrowedTo
    }
    setTimeout(() => {

      this.nameField?.nativeElement.focus();
    }, 10)
  }

  @ViewChild('nameField')
  nameField: ElementRef | undefined;

  borrow = '';
  token = '';
  data!: Series | Book;
  isBook = false;
  isBorrow = false;
  loading = false;
  get book() {
    return this.data as Book;
  }
  get serie() {
    return this.data as Series;
  }
  emprestar() {
    if (!this.borrow) return;
    this.loading = true;
    if (this.isBorrow) {
      this.dialogRef.close({ borrow: false });
      this.bookService.returnBook({ idsBook: this.isBook ? [this.book._id] : this.serie.books.map(b => b._id) }, this.token).subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close({ borrow: true, how: this.borrow });
        }
      )
    } else {
      this.bookService.borrowBook({ idsBook: this.isBook ? [this.book._id] : this.serie.books.map(b => b._id), nameBorrow: this.borrow }, this.token).subscribe(
        () => {
          this.loading = false;
          if (this.isBook) {
            this.book.borrowedTo = this.borrow;
          } else {
            this.serie.books.forEach(book => book.borrowedTo = this.borrow);
          }
          this.dialogRef.close({ borrow: true, how: this.borrow });
        }
      )
    }
  }

}
