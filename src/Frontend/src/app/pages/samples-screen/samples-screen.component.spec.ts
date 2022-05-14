import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesScreenComponent } from './samples-screen.component';

describe('SamplesScreenComponent', () => {
  let component: SamplesScreenComponent;
  let fixture: ComponentFixture<SamplesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
