import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExhibitScreenComponent } from './register-exhibit-screen.component';

describe('RegisterExhibitScreenComponent', () => {
  let component: RegisterExhibitScreenComponent;
  let fixture: ComponentFixture<RegisterExhibitScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterExhibitScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExhibitScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
