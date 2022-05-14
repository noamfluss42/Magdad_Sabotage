import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesInCaseScreenComponent } from './samples-in-case-screen.component';

describe('SamplesInCaseScreenComponent', () => {
  let component: SamplesInCaseScreenComponent;
  let fixture: ComponentFixture<SamplesInCaseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplesInCaseScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesInCaseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
