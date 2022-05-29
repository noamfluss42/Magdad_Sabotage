import { Component, OnInit } from '@angular/core';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { CasesService } from 'src/app/core/services/cases.service';
import { FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';
import { SearchCaseService } from 'src/app/core/services/search-case.service';
@Component({
  selector: 'app-open-case-screen',
  templateUrl: './open-case-screen.component.html',
  styleUrls: ['./open-case-screen.component.css'],
})
export class OpenCaseScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  tags$: FormFieldBase<any>[];
  generateDocxButton$: FormFieldBase<any>[];

  constructor(
    private service: CasesService,
    private searchService: SearchCaseService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
    this.tags$ = service.getTags();
    this.generateDocxButton$ = service.getGenerateDocxButton();
  }

  ngOnInit(): void {}

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();
    // if (
    //   !(
    //     formRawValue['internal_number'] &&
    //     formRawValue['received_or_go'] &&
    //     formRawValue['lab_name'] &&
    //     formRawValue['event_characteristic'] &&
    //     formRawValue['district'] &&
    //     formRawValue['investigating_unit']
    //   )
    // ) {
    //   alert('Fields are required!');
    //   //return;
    // }

    const savedCase = JSON.parse(localStorage.getItem('case') || '[]');
    // merge from.getRawValue data with tags
    const data = { ...savedCase, ...form.getRawValue() };
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
    // get tags values as json

    const formRawValue = {
      ...form.getRawValue(),
      ...{
        'weapon_name': '',
        'explosive_device_material': '',
        'explosive_device_means': '',
        'weapon_options': '',
        'explosive_device_operating_system': '',
        'weapon_mark': '',
        'explosive_device_spray': '',
        'weapon_color': '',
        'explosive_device_camouflage': '',
        'weapon_additional_characteristics': '',
        'min_date':form.getRawValue()['event_date'],
        'max_date': ''
      }
    };
    console.log(formRawValue);
    delete formRawValue.navigator;
    // if (!(formRawValue["internal_number"]
    //    && formRawValue["received_or_go"]
    //    && formRawValue["lab_name"]
    //    && formRawValue["event_characteristic"]
    //    && formRawValue["district"]
    //    && formRawValue["investigating_unit"])
    // ) {
    //   alert("Fields are required!")
    //   return;
    // }

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
        });
      }
    });
    localStorage.setItem('case', JSON.stringify(formRawValue));
    console.log(formRawValue);
  };
}
