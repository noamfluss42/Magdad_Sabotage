import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExhibitDynamicFormComponent } from './register-exhibit-dynamic-form.component';

describe('RegisterExhibitDynamicFormComponent', () => {
  let component: RegisterExhibitDynamicFormComponent;
  let fixture: ComponentFixture<RegisterExhibitDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterExhibitDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExhibitDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
