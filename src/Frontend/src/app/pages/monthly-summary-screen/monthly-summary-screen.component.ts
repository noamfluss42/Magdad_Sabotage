import { Component, Inject, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { MonthlySummaryService } from 'src/app/core/services/monthly-summary.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-monthly-summary-screen',
  templateUrl: './monthly-summary-screen.component.html',
  styleUrls: ['./monthly-summary-screen.component.css'],
  providers: [DatePipe]
})
export class MonthlySummaryScreenComponent implements OnInit {

  data: any;

  constructor(
    private service: MonthlySummaryService,
    private datePipe: DatePipe
  ) {

    let currentDate = new Date()
    let fromDate = "01-" + this.datePipe.transform(currentDate, 'MM-yyyy')
    let toDate = this.datePipe.transform(currentDate, 'dd-MM-yyyy')

    let result =
      service.getMonthlySummary(`${fromDate}|${toDate}`)
             .subscribe((res: any) => (this.data = res));

    this.data = {
      "totalOpenCases": "DUDE1",
      "monthlyOpenedCases": "DUDE2",
      "monthlyClosedCases": "DUDE3",
      "totalNoneAreaEvents": "DUDE4",
      "areasTreatedBySapper": "DUDE5",
      "totalCheckedAreas": "DUDE6",
      "totalMonthlyEvents": "DUDE7",
      "eventsByCategories": "DUDE8",
    }

  }

  ngOnInit(): void {
  }

}
