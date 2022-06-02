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
  saved_non_tags: string;
  saved_tags: string;

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
    this.saved_non_tags = '';
    this.saved_tags = '';
    // Converts fields into array and auto fills case number.

  }

  ngOnInit(): void {}


  /*generateId = (): void => {
    this.service.getCaseId().subscribe((res: any) => {
      this.internal_number = res;
      alert("this.internal_number"+this.internal_number + "hjhj");
    });
    this.saved_tags = ""
    this.saved_non_tags = ""
  };*/

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();
    /*if (this.internal_number == "") {
      alert("press first on" + "צור מספר תיק");
      return;
    }*/
    if (this.saved_non_tags == ""){
      alert("save first tags");
      return;
    }
    alert("this.internal_number"+this.internal_number + "onSubmit");
    const savedCase = JSON.parse(localStorage.getItem('case') || '[]');
    // merge from.getRawValue data with tags
    const data = { ...savedCase, ...formRawValue };
    console.log(data);
    this.service.updateCase(data).subscribe((res: any) => {
          cb(res);
          localStorage.setItem('case', JSON.stringify(data));
    });
    this.sharedData.addToData(data);
    this.saved_tags = "yes"
    // this.router.navigate(['/registerExhibit']);
  };

  onSave = (form: FormGroup, cb: (res: string) => void): void => {
    /*if (this.internal_number == "") {
      alert("press first on" + "צור מספר תיק");
      return;
    }*/
    // sort form value by sinterface keys
    var does_exist = false;
    //print the internal number value from request

    // get tags values as json

    const formRawValue = {

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
        internal_number:this.internal_number,
      },
    };
    console.log(formRawValue);
    delete formRawValue.navigator;
    //alert opened internal_number successfully

    //sort formRawValue by  order of Case interface
    //check first press
    //get case from service
    if (this.saved_non_tags == "") {
      this.service.postCase(formRawValue).subscribe((res: any) => {
        cb(res);
        this.internal_number = res;
        alert(" תיק" + this.internal_number + "נפתח בהצלחה ");
        formRawValue.internal_number = res;
        alert("check formRawValue.internal_number " + formRawValue.internal_number);
        localStorage.setItem('case', JSON.stringify(formRawValue));
        localStorage.setItem('internal_number', JSON.stringify(this.internal_number));
        this.saved_non_tags = "yes";
      });
    }
    else if(this.saved_tags == "yes"){
      alert("ניתן לשמור רק דרך הכפתור התחתון")
    }
    else{
      this.service.updateCase(formRawValue).subscribe((res: any) => {
        cb(res);
        localStorage.setItem('case', JSON.stringify(formRawValue));
      });
    }
  };

  generateDocxPage() {
    this.router.navigate(['/genLabForm']);
  }

}
