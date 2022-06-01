import { Component, OnInit } from '@angular/core';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { CasesService } from 'src/app/core/services/cases.service';
import { FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';
import { SearchCaseService } from 'src/app/core/services/search-case.service';
import { FieldControlService } from 'src/app/core/services/field-control.service';
@Component({
  selector: 'app-open-case-screen',
  templateUrl: './open-case-screen.component.html',
  styleUrls: ['./open-case-screen.component.css'],
})
export class OpenCaseScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  field$: FormFieldBase<string> = new FormFieldBase<string>();
  tags$: FormFieldBase<any>[];
  form!: FormGroup;
  internal_number: string;

  constructor(
    private service: CasesService,
    private searchService: SearchCaseService,
    private sharedData: SharedDataService,
    private fcs: FieldControlService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
    this.tags$ = service.getTags();
    this.field$ = this.fields$[1];
    this.form = this.fcs.toFormGroup([this.field$]);
    this.internal_number = '';

    let value = `${localStorage.getItem("value")}`;
    var values = Array.from(this.fields$.values());
    values[12]['value'] = value == "null" ? "" : value;

  }

  ngOnInit(): void {}

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();

    const savedCase = JSON.parse(localStorage.getItem('case') || '[]');
    // merge from.getRawValue data with tags
    const data = { ...savedCase, ...formRawValue };
    console.log(data);
    this.searchService.postQuery(data).subscribe((res: any) => {
      //check if case exist
      if (res.length > 0) {
        this.service.updateCase(data).subscribe((res: any) => {
          cb(res);
        });
      } else {
        //create case
        this.service.postCase(data).subscribe((res: any) => {
          cb(res);
        });
      }
    });
    this.sharedData.addToData(data);
    localStorage.setItem('case', JSON.stringify(data));

    // this.router.navigate(['/registerExhibit']);
  };

  onSave = (form: FormGroup, cb: (res: string) => void): void => {
    // sort form value by sinterface keys
    var does_exist = false;
    //print the internal number value from request

    // get tags values as json

    const formRawValue = {
      ...{internal_number: '' },
      ...form.getRawValue(),
      ...{
        weapon_name: '',
        explosive_device_material: '',
        explosive_device_means: '',
        weapon_options: '',
        explosive_device_operating_system: '',
        weapon_mark: '',
        explosive_device_spray: '',
        weapon_color: '',
        explosive_device_camouflage: '',
        weapon_additional_characteristics: '',
        min_date: form.getRawValue()['event_date'],
        max_date: '',
      },
    };
    console.log(formRawValue);
    delete formRawValue.navigator;
    //alert opened internal_number successfully

    //sort formRawValue by  order of Case interface
    //check first press
    //get case from service
    this.searchService.postQuery(formRawValue).subscribe((res: any) => {
      //check if case exist
      if (res.length > 0) {
        does_exist = true;
      }
      if (does_exist) {
        //update case
        this.service.updateCase(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      } else {
        //create case
        this.service.postCase(formRawValue).subscribe((res: any) => {
          cb(res);
          this.internal_number = res;
          alert( " תיק"+ this.internal_number + "נפתח בהצלחה "); //TODO for noam
          formRawValue.internal_number = this.internal_number;
          localStorage.setItem('case', JSON.stringify(formRawValue));
        });
      }
    });
  };

  generateDocxPage() {
    this.router.navigate(['/genLabForm']);
  }

  autoFill() {
    localStorage.setItem("value", "work!");
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
