import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExhibitDynamicFormComponent } from './edit-exhibit-dynamic-form.component';

describe('EditExhibitDynamicFormComponent', () => {
  let component: EditExhibitDynamicFormComponent;
  let fixture: ComponentFixture<EditExhibitDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExhibitDynamicFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExhibitDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
