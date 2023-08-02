import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEspacioComponent } from './modificar-espacio.component';

describe('ModificarEspacioComponent', () => {
  let component: ModificarEspacioComponent;
  let fixture: ComponentFixture<ModificarEspacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarEspacioComponent]
    });
    fixture = TestBed.createComponent(ModificarEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
