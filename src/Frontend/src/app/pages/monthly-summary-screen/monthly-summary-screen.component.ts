import {Component, Inject, OnInit} from '@angular/core';
import {first, Observable} from 'rxjs';
import {FormFieldBase} from '../../core/utils/form-field-base';
import {SummaryService} from 'src/app/core/services/summary.service';
import {FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
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
  totalCheckedAreas: number = 4;
  eventsByCategories_count_weapons: number = 5;
  eventsByCategories_count_explosive_device: number = 6;
  eventsByCategories_count_fireworks: number = 7;
  eventsByCategories_count_query: number = 8;

  constructor(
    private service: SummaryService,
    private datePipe: DatePipe
  ) {

    let currentDate = new Date()
    let fromDate = "01-" + this.datePipe.transform(currentDate, 'MM-yyyy')
    let toDate = this.datePipe.transform(currentDate, 'dd-MM-yyyy')

    let result =
      service.getMonthlySummary(`${fromDate}|${toDate}`)
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
      "0",
      "0",
    ]

  }

  ngOnInit(): void {
  }

}
