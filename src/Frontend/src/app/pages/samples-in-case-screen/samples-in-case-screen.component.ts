import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SamplesService } from 'src/app/core/services/samples.service';
import { TableColumn } from 'src/app/core/utils/types';

@Component({
  selector: 'app-samples-in-case-screen',
  templateUrl: './samples-in-case-screen.component.html',
  styleUrls: ['./samples-in-case-screen.component.css']
})
export class SamplesInCaseScreenComponent implements OnInit {
  private case_internal_number: any;
  private exhibit_number: any;
  public tableColumns: TableColumn[] = [];
  public tableData: any = [];
  constructor(
    private service: SamplesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.service.getTableColumns();
    this.case_internal_number = JSON.parse(localStorage.getItem('case') || '[]').internal_number;
    this.exhibit_number = JSON.parse(localStorage.getItem('exhibit') || '[]').exhibit_number;
    console.log(this.exhibit_number);

    this.tableData = this.service.getSamplesFromExhibit(this.case_internal_number,this.exhibit_number);

  }


}
