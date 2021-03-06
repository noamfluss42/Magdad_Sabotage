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
  totalCheckedAreas: number = 4;
  eventsByCategories_count_weapons: number = 5;
  eventsByCategories_count_explosive_device: number = 6;
  eventsByCategories_count_fireworks: number = 7;
  eventsByCategories_count_query: number = 8;


  totalYealryOpenCases: number = 0;
  totalOpenCasesThisYear: number = 1;
  yearlyOpenedCases: number = 2;
  yearlyClosedCases: number = 3;
  totalYearlyNoneAreaEvents: number = 4;
  totalYearlyCheckedAreas: number = 5;
  eventsByCategories_count_weaponsYearly: number = 6;
  eventsByCategories_count_explosive_deviceYearly: number = 7;
  eventsByCategories_count_fireworksYearly: number = 8;
  eventsByCategories_count_queryYearly: number = 9;

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
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
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
        .subscribe((res: any) => (this.monthlySummary = [res.totalOpenCases,
                                                              res.monthlyOpenedCases,
                                                              res.monthlyClosedCases,
                                                              res.totalNoneAreaEvents,
                                                              res.totalCheckedAreas,
                                                              res.eventsByCategories_count_weapons,
                                                              res.eventsByCategories_count_explosive_device,
                                                              res.eventsByCategories_count_fireworks,
                                                              res.eventsByCategories_count_query]));

    this.monthlySummary = [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ]

    this.month = month
    this.range = `01.${this.datePipe.transform(lastMonthDay, 'MM.yy')} - ${this.datePipe.transform(lastMonthDay, 'dd.MM.yy')}`

  }

}
