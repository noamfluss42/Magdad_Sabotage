import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchCaseService } from 'src/app/core/services/search-case.service';
import { CaseSearch, ResultCaseTable, TableColumn } from 'src/app/core/utils/types';
@Component({
  selector: 'app-results-screen',
  templateUrl: './results-screen.component.html',
  styleUrls: ['./results-screen.component.css']
})
export class ResultsScreenComponent implements OnInit {
  private caseId: string = '';
  public resultCaseTableColumns: TableColumn[] = [];
  public tableData: CaseSearch[] = [];
  public searchResults:number = this.service.getData().length | 0;


  constructor(private route: ActivatedRoute,private service: SearchCaseService) {
console.log(this.searchResults);
  }


  //gets data from the local storage and shows it in the results screen


  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') as string;
    this.resultCaseTableColumns = this.service.getTableColumns();
    this.tableData = this.service.getData();
  }

}
