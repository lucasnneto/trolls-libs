import { Component } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Book, Series } from '../series';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent {
  constructor(
    private bookService: BooksService,
    public dialogRef: NbDialogRef<DialogEditComponent>,
    public dialogService: NbDialogService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token') as string;

    this.isBook = '_id' in this.data && 'title' in this.data;
    if (!this.isBook) {
      this.newSerieName = this.serie.series;
    }
  }
  token = '';
  data!: Series | Book;
  isBook = false;
  loading = false;
  copySerie: Series | null = null;
  newSerieName = '';
  get book() {
    return this.data as Book;
  }
  get serie() {
    return this.data as Series;
  }
  editBookFromSeries(id: number) {
    this.copySerie = { ...this.serie };
    this.data = { ...this.copySerie.books[id] };
    this.isBook = true;
  }
  addNew() {
    this.router.navigate(['/forms', this.serie.series]);
    this.dialogRef.close();
  }
  deleteCard(data: Book) {
    const dialogRef = this.dialogService.open(DialogDeleteComponent, {
      context: { data },
    });
    dialogRef.onClose.subscribe((data) => {
      if (!data || !data.delete) return;
      if (data.type === 'livro') {
        const ind = (this.data as Series).books.findIndex((el) => el._id === data.id);
        (this.data as Series).books.splice(ind, 1);
      }
    });
  }
  async save() {
    if (this.isBook) {
      console.log('salvar livro');
      await new Promise(
        (res) => {
          this.bookService.editBook({ books: { author: this.book.author, title: this.book.title }, ids: this.book._id }, this.token).subscribe(res)
        }
      )
    } else {
      this.serie.series = this.newSerieName;
    }

    if (this.copySerie != null) {
      const ind = this.copySerie.books.findIndex(b => b._id == this.book._id);
      this.copySerie.books[ind] = this.book;
      this.data = this.copySerie;
      this.copySerie = null;
      this.isBook = false;
      this.newSerieName = this.serie.series;
    } else {
      this.dialogRef.close();
    }
  }
  cancel() {
    if (this.copySerie != null) {
      this.data = this.copySerie;
      this.copySerie = null;
      this.isBook = false;
      this.newSerieName = this.serie.series;
    } else {
      this.dialogRef.close();
    }
  }
}
