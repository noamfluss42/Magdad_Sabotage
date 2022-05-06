import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySummaryScreenComponent } from './monthly-summary-screen.component';

describe('MonthlySummaryScreenComponent', () => {
  let component: MonthlySummaryScreenComponent;
  let fixture: ComponentFixture<MonthlySummaryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySummaryScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
