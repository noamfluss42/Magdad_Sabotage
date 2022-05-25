import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSamplesScreenComponent } from './edit-samples-screen.component';

describe('EditSamplesScreenComponent', () => {
  let component: EditSamplesScreenComponent;
  let fixture: ComponentFixture<EditSamplesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSamplesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSamplesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
