import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitsInCaseScreenComponent } from './exhibits-in-case-screen.component';

describe('ExhibitsInCaseScreenComponent', () => {
  let component: ExhibitsInCaseScreenComponent;
  let fixture: ComponentFixture<ExhibitsInCaseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitsInCaseScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitsInCaseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
