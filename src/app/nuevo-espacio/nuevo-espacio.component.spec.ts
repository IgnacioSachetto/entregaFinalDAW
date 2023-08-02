import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEspacioComponent } from './nuevo-espacio.component';

describe('NuevoEspacioComponent', () => {
  let component: NuevoEspacioComponent;
  let fixture: ComponentFixture<NuevoEspacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoEspacioComponent]
    });
    fixture = TestBed.createComponent(NuevoEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
