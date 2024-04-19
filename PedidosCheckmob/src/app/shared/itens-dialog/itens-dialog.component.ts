import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../views/home/home.component';
import { ItemRestaurante } from '../../views/home/home.component';
import { Inject } from '@angular/core';



import {

  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-itens-dialog',
  standalone: true,
  imports: [MatInputModule, CommonModule, FormsModule, MatFormFieldModule, HomeComponent, FormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatButtonToggleModule, MatDialogActions, MatDialogClose, MatDatepickerModule, MatCheckboxModule],
  templateUrl: './itens-dialog.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './itens-dialog.component.scss'
})
export class ItensDialogComponent {

  itens!: ItemRestaurante;
  isChange!: boolean;

  constructor(

    public dialogRef: MatDialogRef<ItensDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemRestaurante,
  ) { }

  ngOnInit(): void {
    if (this.data.quantidade != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
