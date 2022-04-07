import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCaseScreenComponent } from './search-case-screen.component';

describe('SearchCaseScreenComponent', () => {
  let component: SearchCaseScreenComponent;
  let fixture: ComponentFixture<SearchCaseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCaseScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCaseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
