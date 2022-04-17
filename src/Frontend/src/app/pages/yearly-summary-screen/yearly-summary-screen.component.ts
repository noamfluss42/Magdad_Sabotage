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
  styleUrls: ['./yearly-summary-screen.component.css']
})
export class YearlySummaryScreenComponent implements OnInit {

  data: any;

  constructor(
    private service: SummaryService,
  ) {

    let result =
      service.getYearlySummary()
        .subscribe((res: any) => (this.data = res));

    this.data = {
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

}
