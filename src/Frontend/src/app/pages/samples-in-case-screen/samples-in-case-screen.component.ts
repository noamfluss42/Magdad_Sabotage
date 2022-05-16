import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/core/utils/types';

@Component({
  selector: 'app-samples-in-case-screen',
  templateUrl: './samples-in-case-screen.component.html',
  styleUrls: ['./samples-in-case-screen.component.css']
})
export class SamplesInCaseScreenComponent implements OnInit {
  private caseId: string = '';
  private internal_number: any;
  private case: any;
  public tableColumns: TableColumn[] = [];
  public tableData: any = [];
  constructor() { }

  ngOnInit(): void {
  }
  

}
