import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book, Series } from '../series';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailsComponent } from '../dialog-details/dialog-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private bookService: BooksService, public dialog: MatDialog) {}

  isLogged = false;
  loading = true;

  ngOnInit(): void {
    this.getSeries();
    this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((text) => {
        this.getSeries(text);
      });
    const token = sessionStorage.getItem('token');
    if (token) this.isLogged = true;
  }
  private searchTerms = new Subject<string>();
  series!: Series[];
  books!: Book[];

  search(term: string): void {
    this.searchTerms.next(term);
  }
  getSeries(term?: string) {
    this.series = [];
    this.books = [];
    this.loading = true;
    this.bookService.getSeries(term).subscribe((series) => {
      this.loading = false;
      this.series = series.filter((serie) => serie.series);
      this.books = series.find((serie) => !serie.series)?.books || [];
    });
  }
  selectSerieCard(serie: Series) {
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      data: serie,
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed',result);
    // });
  }
}
