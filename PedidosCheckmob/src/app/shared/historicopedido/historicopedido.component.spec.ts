import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricopedidoComponent } from './historicopedido.component';

describe('HistoricopedidoComponent', () => {
  let component: HistoricopedidoComponent;
  let fixture: ComponentFixture<HistoricopedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricopedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricopedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
