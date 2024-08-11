import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(private router: Router, private bookService: BooksService) {}
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.token = token;
  }
  token = '';
  loading = false;
  nomeColecao = '';
  libs: { title: string; author: string }[] = [
    {
      title: '',
      author: '',
    },
  ];
  incluirLivro() {
    this.libs.push({
      title: '',
      author: '',
    });
  }
  removerLivro(index: number) {
    this.libs.splice(index, 1);
  }
  finalizarCriacao() {
    this.loading = true;
    const newBooks = this.libs.map((el) => ({
      ...el,
      series: this.nomeColecao || undefined,
    }));
    this.bookService.addNew({ books: newBooks }, this.token).subscribe({
      error: () => {
        this.loading = false;
        alert('Ocorreu um erro ao adicionar a coleção');
      },
      complete: () => {
        this.loading = false;
        alert('Coleção criada com sucesso');
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
