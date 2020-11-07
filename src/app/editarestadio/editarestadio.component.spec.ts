import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarestadioComponent } from './editarestadio.component';

describe('EditarestadioComponent', () => {
  let component: EditarestadioComponent;
  let fixture: ComponentFixture<EditarestadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarestadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarestadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
