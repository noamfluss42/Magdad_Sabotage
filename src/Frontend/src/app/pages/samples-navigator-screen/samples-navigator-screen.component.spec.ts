import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesNavigatorScreenComponent } from './samples-navigator-screen.component';

describe('SamplesNavigatorScreenComponent', () => {
  let component: SamplesNavigatorScreenComponent;
  let fixture: ComponentFixture<SamplesNavigatorScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplesNavigatorScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesNavigatorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
