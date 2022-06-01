import { Component, Inject, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { SummaryService } from 'src/app/core/services/summary.service';
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

  monthlySummary: any;

  totalOpenCases: number = 0;
  monthlyOpenedCases: number = 1;
  monthlyClosedCases: number = 2;
  totalNoneAreaEvents: number = 3;
  areasTreatedBySapper: number = 4;
  totalCheckedAreas: number = 5;
  totalMonthlyEvents: number = 6;
  eventsByCategories: number = 7;

  constructor(
    private service: SummaryService,
    private datePipe: DatePipe
  ) {

    // Making date format string of recent month date range.
    // "01-{recent month}-2022", "{current day}-{recent month}-2022"
    let currentDate = new Date()
    let fromDate = "01-" + this.datePipe.transform(currentDate, 'MM-yyyy')
    let toDate = this.datePipe.transform(currentDate, 'dd-MM-yyyy')

    let result = // Gets recent monthly summary from backend.
      service.getMonthlySummary(`${fromDate}|${toDate}`)
        .subscribe((res: any) => (this.monthlySummary = res));

    this.monthlySummary = [
      "Data1",
      "Data2",
      "Data3",
      "Data4",
      "Data5",
      "Data6",
      "Data7",
      "Data8",
    ]

  }

  ngOnInit(): void {
  }

}
