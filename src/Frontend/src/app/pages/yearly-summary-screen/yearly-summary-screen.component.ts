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
    let result =
      service.getYearlySummary()
        .subscribe((res: any) => (this.yearlySummary = res));

    this.yearlySummary = {
      "totalOpenCases": "Data1",
      "totalOpenCasesThisYear": "Data2",
      "yearlyOpenedCases": "Data3",
      "yearlyClosedCases": "Data4",
      "totalNoneAreaEvents": "Data5",
      "areasTreatedBySapper": "Data6",
      "totalCheckedAreas": "Data7",
      "totalYearlyEvents": "Data8",
      "eventsByCategories": "Data9",
    }

  }

  ngOnInit(): void {
  }

  getMonthlySummary(month: number) {

    let currentDate = new Date()
    let monthRange = `0${month}-${this.datePipe.transform(currentDate, 'yyyy')}`

    let result =
      this.service.getMonthlySummary(monthRange)
        .subscribe((res: any) => (this.monthlySummary = res));

    this.monthlySummary = {
      "totalOpenCases": "Data1",
      "monthlyOpenedCases": "Data2",
      "monthlyClosedCases": "Data3",
      "totalNoneAreaEvents": "Data4",
      "areasTreatedBySapper": "Data5",
      "totalCheckedAreas": "Data6",
      "totalMonthlyEvents": "Data7",
      "eventsByCategories": "Data8",
    }

    this.month = month

  }

}
