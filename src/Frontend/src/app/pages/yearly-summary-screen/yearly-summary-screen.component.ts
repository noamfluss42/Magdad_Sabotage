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
  selector: 'app-yearly-summary-screen',
  templateUrl: './yearly-summary-screen.component.html',
  styleUrls: ['./yearly-summary-screen.component.css'],
  providers: [DatePipe]
})
export class YearlySummaryScreenComponent implements OnInit {

  yearlySummary: any;
  monthlySummary: any;
  month: number;
  range: string;

  totalOpenCases: number = 0;
  monthlyOpenedCases: number = 1;
  monthlyClosedCases: number = 2;
  totalNoneAreaEvents: number = 3;
  areasTreatedBySapper: number = 4;
  totalCheckedAreas: number = 5;
  totalMonthlyEvents: number = 6;
  eventsByCategories: number = 7;

  totalYealryOpenCases: number = 0;
  totalOpenCasesThisYear: number = 1;
  yearlyOpenedCases: number = 2;
  yearlyClosedCases: number = 3;
  totalYearlyNoneAreaEvents: number = 4;
  areasTreatedBySapperYearly: number = 5;
  totalYearlyCheckedAreas: number = 6;
  totalYearlyEvents: number = 7;
  eventsByCategoriesYearly: number = 8;

  months: Array<string> = [
    "סיכום שנתי",
    "סיכום חודש ינואר",
    "סיכום חודש פברואר",
    "סיכום חודש מרץ",
    "סיכום חודש אפריל",
    "סיכום חודש מאי",
    "סיכום חודש יוני",
    "סיכום חודש יולי",
    "סיכום חודש אוגוסט",
    "סיכום חודש ספטמבר",
    "סיכום חודש אוקטובר",
    "סיכום חודש נובמבר",
    "סיכום חודש דצמבר",
  ]

  constructor(
    private service: SummaryService,
    private datePipe: DatePipe
  ) {

    this.month = 0;
    this.range = "";

    let currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy')
    let result = // Gets recent yearly summary from backend.
      service.getYearlySummary(`${currentDate}`)
        .subscribe((res: any) => (this.yearlySummary = res));

    this.yearlySummary = [
      "Data1",
      "Data2",
      "Data3",
      "Data4",
      "Data5",
      "Data6",
      "Data7",
      "Data8",
      "Data9",
    ]

  }

  ngOnInit(): void {
  }

  // Gets monthly summary by given month number.
  getMonthlySummary(month: number) {

    var lastMonthDay = new Date(new Date().getFullYear(), month, 0);

    let fromDate = `01-${this.datePipe.transform(lastMonthDay, 'MM-yyyy')}`
    let toDate = this.datePipe.transform(lastMonthDay, 'dd-MM-yyyy')

    let result =
      this.service.getMonthlySummary(`${fromDate}|${toDate}`)
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

    this.month = month
    this.range = `01.${this.datePipe.transform(lastMonthDay, 'MM.yy')} - ${this.datePipe.transform(lastMonthDay, 'dd.MM.yy')}`

  }

}
