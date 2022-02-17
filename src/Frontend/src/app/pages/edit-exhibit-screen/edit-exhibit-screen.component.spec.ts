import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExhibitScreenComponent } from './edit-exhibit-screen.component';

describe('EditExhibitScreenComponent', () => {
  let component: EditExhibitScreenComponent;
  let fixture: ComponentFixture<EditExhibitScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExhibitScreenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExhibitScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
