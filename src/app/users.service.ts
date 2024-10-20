import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { environment } from 'src/environments/environment';


export interface IGoogleBook {
  id: string,
  volumeInfo: {
    authors: string[],
    imageLinks: {
      thumbnail: string,
      smallThumbnail: string,
    }
    language: string,
    title: string,
    description: string,
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }
  url = environment.apiUrl + 'users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  login(data: { username: string; password: string }) {
    return this.http.post<{ token: string }>(
      this.url + '/login',
      data,
      this.httpOptions
    );
  }
  getMe(token: string) {
    return this.http.get<{ user: User }>(this.url + '/me', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
  }
  buscaLivro(search: string) {
    // return this.http.get<{ items: IGoogleBook[] }>(
    //   'https://www.googleapis.com/books/v1/volumes/' + search,
    //   {
    //     // headers: {
    //     //   authorization: 'Bearer ' + token,
    //     // },
    //   }
    // );

    return this.http.get<{ items: IGoogleBook[] }>(
      'https://www.googleapis.com/books/v1/volumes',
      {
        params: {
          q: search
        }
        // headers: {
        //   authorization: 'Bearer ' + token,
        // },
      }
    );
  }
}
