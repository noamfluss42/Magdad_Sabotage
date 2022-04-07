import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCaseSearchComponent } from './search-case-search.component';

describe('SearchCaseSearchComponent', () => {
  let component: SearchCaseSearchComponent;
  let fixture: ComponentFixture<SearchCaseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCaseSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
