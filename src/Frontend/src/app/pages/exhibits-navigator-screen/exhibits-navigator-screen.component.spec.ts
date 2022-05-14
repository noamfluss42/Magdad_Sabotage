import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitsNavigatorScreenComponent } from './exhibits-navigator-screen.component';

describe('ExhibitsNavigatorScreenComponent', () => {
  let component: ExhibitsNavigatorScreenComponent;
  let fixture: ComponentFixture<ExhibitsNavigatorScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitsNavigatorScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitsNavigatorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
