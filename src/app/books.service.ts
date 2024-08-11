import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Series } from './series';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}
  url = environment.apiUrl + 'books';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  getSeries(term?: string) {
    const url = new URL(this.url);
    if (term) {
      url.searchParams.append('filter', term);
    }
    return this.http.get<Series[]>(url.href);
  }
  getOwner(owner: string) {
    const url = new URL(this.url);

    url.searchParams.append('owner', owner);

    return this.http.get<Series[]>(url.href);
  }
  addNew(
    data: {
      books: { title: string; author: string; series: string | undefined }[];
    },
    token: string
  ) {
    return this.http.post<Series>(this.url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      }),
    });
  }
  deleteBook(data: { ids: string[] }, token: string) {
    const url = new URL(this.url);

    // url.searchParams.append('ids', JSON.stringify(data.ids));

    //TODO MEXER NO ENDPOINT DE DELETE
    return this.http.post<Series>(url.href + '/delete', data, {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + token,
      }),
    });
  }
}
