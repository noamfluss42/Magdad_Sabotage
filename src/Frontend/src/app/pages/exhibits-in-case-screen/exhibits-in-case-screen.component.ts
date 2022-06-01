import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExhibitsService } from 'src/app/core/services/exhibits.service';
import { Exhibit, TableColumn } from 'src/app/core/utils/types';

@Component({
  selector: 'app-exhibits-in-case-screen',
  templateUrl: './exhibits-in-case-screen.component.html',
  styleUrls: ['./exhibits-in-case-screen.component.css'],
})
export class ExhibitsInCaseScreenComponent implements OnInit {
  private caseId: string = '';
  private internal_number: any;
  private case: any;
  public tableColumns: TableColumn[] = [];
  public tableData: any = [];
  constructor(
    private route: ActivatedRoute,
    private service: ExhibitsService
  ) {}

  ngOnInit(): void {
    //redirect to loading screen for 1 sec while getting real data
    // TODO fix get item
    this.case= localStorage.getItem('case')
    if (this.case) {
      this.internal_number =JSON.parse(this.case).internal_number.split('.')[0]
      alert(this.internal_number)
    }
    this.tableColumns = this.service.getTableColumns();
    this.tableData = this.service.getExhibitsFromCase(this.internal_number);
    localStorage.setItem('screen','/case/:id/exhibits');
  }
}
