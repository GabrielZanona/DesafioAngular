import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensDialogComponent } from './itens-dialog.component';

describe('ItensDialogComponent', () => {
  let component: ItensDialogComponent;
  let fixture: ComponentFixture<ItensDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItensDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
