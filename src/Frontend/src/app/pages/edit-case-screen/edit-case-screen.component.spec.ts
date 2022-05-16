import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaseScreenComponent } from './edit-case-screen.component';

describe('EditCaseScreenComponent', () => {
  let component: EditCaseScreenComponent;
  let fixture: ComponentFixture<EditCaseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaseScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
