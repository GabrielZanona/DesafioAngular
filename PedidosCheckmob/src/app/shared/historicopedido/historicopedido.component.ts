import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ItemRestaurante } from '../../views/home/home.component';
import { PedidoService } from '../../pedido.service';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-historicopedido',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule],
  templateUrl: './historicopedido.component.html',
  styleUrl: './historicopedido.component.scss'
})
export class HistoricopedidoComponent {

  displayedColumns: string[] = ['name', 'quantidade', 'vegetariano', 'datapedido'];

  pedidos: { [key: string]: ItemRestaurante[] } = {};

  constructor(private pedidoService: PedidoService,private router: Router) { }

  ngOnInit(): void {
    this.pedidoService.pedidos$.subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  navigateToHome(): void {
  
    this.router.navigate(['/']); 
  }


}
