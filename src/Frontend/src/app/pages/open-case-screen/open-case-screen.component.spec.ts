import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCaseScreenComponent } from './open-case-screen.component';

describe('OpenCaseScreenComponent', () => {
  let component: OpenCaseScreenComponent;
  let fixture: ComponentFixture<OpenCaseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCaseScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCaseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
