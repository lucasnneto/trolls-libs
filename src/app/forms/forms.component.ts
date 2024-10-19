import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DialogBuscaComponent } from '../dialog-busca/dialog-busca.component';
import { IGoogleBook } from '../users.service';

interface CreateBook {
  title: string;
  author: string;
  thumbnail?: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(
    private router: Router,
    private bookService: BooksService,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.token = token;
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    if (name) {
      this.nomeColecao = name;
      this.created = true;
      this.incluirLivro();
    }
  }
  created = false;
  token = '';
  loading = false;
  nomeColecao = '';
  imagemVoid =
    'data:image/png;base64,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';
  libs: CreateBook[] = [];
  buscarDetalhes(index: number) {
    const dialogRef = this.dialogService.open(DialogBuscaComponent, {});
    dialogRef.onClose.subscribe((data: IGoogleBook) => {
      this.libs[index].author = data.volumeInfo.authors[0] || '';
      this.libs[index].title = data.volumeInfo.title || '';
      this.libs[index].thumbnail = data.volumeInfo.imageLinks.thumbnail || '';
    });
  }
  incluirLivro() {
    this.libs.push({
      title: '',
      author: '',
      thumbnail: '',
    });
    // this.buscarDetalhes(this.libs.length - 1);
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
        alert(
          this.created
            ? 'Livro(s) adicionado a coleção'
            : 'Coleção criada com sucesso'
        );
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
