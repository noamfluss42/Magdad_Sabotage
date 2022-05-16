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
  private caseId: string = '';
  private exhibit_id: any;
  private exhibit_number: any;
  public tableColumns: TableColumn[] = [];
  public tableData: any = [];
  constructor(
    private service: SamplesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.service.getTableColumns();
    this.exhibit_number =localStorage.getItem('exhibit_number')
    console.log(this.exhibit_number);
    if (this.exhibit_number) {
      this.tableData = this.service.getSamplesFromExhibit(this.exhibit_number);
    }



  }


}
