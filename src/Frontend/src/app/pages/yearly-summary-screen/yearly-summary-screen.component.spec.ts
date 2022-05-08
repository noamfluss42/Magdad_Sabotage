import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlySummaryScreenComponent } from './yearly-summary-screen.component';

describe('YearlySummaryScreenComponent', () => {
  let component: YearlySummaryScreenComponent;
  let fixture: ComponentFixture<YearlySummaryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlySummaryScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlySummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
