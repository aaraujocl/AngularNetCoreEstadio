import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarentradaComponent } from './registrarentrada.component';

describe('RegistrarentradaComponent', () => {
  let component: RegistrarentradaComponent;
  let fixture: ComponentFixture<RegistrarentradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarentradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
