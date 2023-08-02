import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarReservanteComponent } from './modificar-reservante.component';

describe('ModificarReservanteComponent', () => {
  let component: ModificarReservanteComponent;
  let fixture: ComponentFixture<ModificarReservanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarReservanteComponent]
    });
    fixture = TestBed.createComponent(ModificarReservanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
