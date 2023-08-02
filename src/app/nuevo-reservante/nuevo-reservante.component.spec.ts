import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoReservanteComponent } from './nuevo-reservante.component';

describe('NuevoReservanteComponent', () => {
  let component: NuevoReservanteComponent;
  let fixture: ComponentFixture<NuevoReservanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoReservanteComponent]
    });
    fixture = TestBed.createComponent(NuevoReservanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
