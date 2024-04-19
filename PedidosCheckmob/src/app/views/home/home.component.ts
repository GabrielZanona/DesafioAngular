import { CommonModule } from '@angular/common';
import { Component, ViewChild, viewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItensDialogComponent } from '../../shared/itens-dialog/itens-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// npm install uuid      
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { PedidoService } from '../../pedido.service';
import { HistoricopedidoComponent } from '../../shared/historicopedido/historicopedido.component';



export interface ItemRestaurante {
  id: string | null;
  nome: string;
  quantidade: number;
  vegetariano: boolean;
  datapedido?: Date | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule, ItensDialogComponent, MatDialogModule, HistoricopedidoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['quantidade', 'nome', 'vegetariano', 'datapedido', 'actions'];
  dataSource: any[] = []
  mostrarhistorico = false;

  constructor(public dialog: MatDialog, private router: Router, private pedidoService: PedidoService) { }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  openDialog(item: ItemRestaurante | null): void {
    const dialogRef = this.dialog.open(ItensDialogComponent, {
      data: item === null ? {
        id: null,
        nome: '',
        quantidade: null,
        vegetariano: false,
        datapedido: null,
      } : {
        id: item.id,
        nome: item.nome,
        quantidade: item.quantidade,
        vegetariano: item.vegetariano,
        datapedido: item.datapedido,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.nome.trim() !== '' && result.quantidade !== null && result.datapedido !== null) {
          if (result.id === null) {
            result.id = uuid();
            console.log(`Adicionando novo item com ID: ${result.id}`);
            this.dataSource.push(result);
          } else {
            const existingItemIndex = this.dataSource.findIndex(p => p.id === result.id);
            if (existingItemIndex !== -1) {
              this.dataSource[existingItemIndex] = result;
              console.log(`Editando item com ID: ${result.id}`);
            }
          }
          this.table.renderRows();
        } else {
          console.log('Por favor, preencha todos os campos obrigatórios.');
        }
      }
    });
  }

  deleteItem(id: string): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }

  editItem(item: ItemRestaurante): void {
    this.openDialog(item);
  }

  private pedidoCounter: number = 1;

  pedidos: { [key: string]: ItemRestaurante[] } = {};

  moveItemsToPedido(): void {

    const pedidoKey = `pedido${this.pedidoCounter}`;
    this.pedidos[pedidoKey] = [...this.dataSource];

    if (this.dataSource.length === 0) {
      console.error('Não é possível criar um pedido vazio.');
      return;
    }

    this.pedidoService.addPedido(pedidoKey, this.pedidos[pedidoKey]);

    this.dataSource = [];

    this.pedidoCounter++;

    this.table.renderRows();

    console.log(`Itens movidos para o pedido ${this.pedidoCounter - 1}.`);
  }

  navigateToHistoricoPedido(): void {
    this.mostrarhistorico = true;
  }

  navigateToHome(): void {
    this.mostrarhistorico = false;
  }

}


