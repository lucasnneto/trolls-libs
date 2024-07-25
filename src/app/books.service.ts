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
  addNew(data: { title: string; author: string }, token: string) {
    return this.http.post<Series>(this.url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      }),
    });
  }
  deleteBook(id: string, token: string) {
    return this.http.delete<Series>(this.url + '/' + id, {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + token,
      }),
    });
  }
}
