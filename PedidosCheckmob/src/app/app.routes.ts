import { Routes } from '@angular/router';
import { HistoricopedidoComponent } from './shared/historicopedido/historicopedido.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'historico-pedido', component: HistoricopedidoComponent},
];
