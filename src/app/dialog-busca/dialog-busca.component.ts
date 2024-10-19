import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IGoogleBook, UsersService } from '../users.service';

@Component({
  selector: 'app-dialog-busca',
  templateUrl: './dialog-busca.component.html',
  styleUrls: ['./dialog-busca.component.scss']
})
export class DialogBuscaComponent {
  constructor(public dialogRef: NbDialogRef<DialogBuscaComponent>, public userService: UsersService) { }
  buscar = "";
  listalivros: IGoogleBook[] = [];
  loading = false;
  buscarNaApi() {
    if (!this.buscar || this.loading) return;
    this.loading = true;
    this.userService.buscaLivro(this.buscar).subscribe(({ items }) => {
      this.loading = false;
      this.listalivros = items;
    });
  }
  autores(authors: string[]) {
    if (authors.length === 0) return 'Autor desconhecido';
    if (authors.length === 1) return authors[0];
    else return authors[0] + ' + ' + (authors.length - 1) + ' autores'
  }
}
