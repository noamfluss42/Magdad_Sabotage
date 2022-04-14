import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenLabFormScreenComponent } from './gen-lab-form-screen.component';

describe('GenLabFormScreenComponent', () => {
  let component: GenLabFormScreenComponent;
  let fixture: ComponentFixture<GenLabFormScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenLabFormScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenLabFormScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
