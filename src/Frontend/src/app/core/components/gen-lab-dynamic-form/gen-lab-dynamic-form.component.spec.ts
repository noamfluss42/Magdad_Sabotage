import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenLabDynamicFormComponent } from './gen-lab-dynamic-form.component';

describe('GenLabDynamicFormComponent', () => {
  let component: GenLabDynamicFormComponent;
  let fixture: ComponentFixture<GenLabDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenLabDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenLabDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
