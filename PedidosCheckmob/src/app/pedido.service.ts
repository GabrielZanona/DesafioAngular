import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemRestaurante } from './views/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidosSubject = new BehaviorSubject<{ [key: string]: ItemRestaurante[] }>({});
  public pedidos$ = this.pedidosSubject.asObservable();

  constructor() { }

  addPedido(pedidoKey: string, items: ItemRestaurante[]): void {
    const currentPedidos = { ...this.pedidosSubject.value };
    currentPedidos[pedidoKey] = items;
    this.pedidosSubject.next(currentPedidos);
  }

  getAllPedidos(): { [key: string]: ItemRestaurante[] } {
    return this.pedidosSubject.value;
  }
}