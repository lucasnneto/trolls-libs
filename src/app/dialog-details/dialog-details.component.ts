import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Series } from '../series';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss'],
})
export class DialogDetailsComponent {
  serie!: Series;
  constructor(public dialogRef: NbDialogRef<DialogDetailsComponent>) {}
}
