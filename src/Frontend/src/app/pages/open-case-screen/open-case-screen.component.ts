import { Component, OnInit } from '@angular/core';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { CasesService } from 'src/app/core/services/cases.service';
import { FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-open-case-screen',
  templateUrl: './open-case-screen.component.html',
  styleUrls: ['./open-case-screen.component.css'],
})
export class OpenCaseScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  tags$ : FormFieldBase<any>[];


  constructor(
    private service: CasesService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
    this.tags$ = service.getTags();

  }

  ngOnInit(): void { }

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {

    const formRawValue = form.getRawValue();
    if (!(formRawValue["internal_number"]
      && formRawValue["received_or_go"]
      && formRawValue["lab_name"]
      && formRawValue["event_characteristic"]
      && formRawValue["district"]
      && formRawValue["investigating_unit"])
    ) {
      alert("Fields are required!")
      return;
    }

    const savedCase = JSON.parse(localStorage.getItem('case') || '[]');
    // merge from.getRawValue data with tags
    const data = {...savedCase, ...form.getRawValue()};
    console.log(data);
    this.service.postCase(data).subscribe((res: any) => {
      cb(res);
    });
    this.sharedData.addToData(data);
    localStorage.setItem('case', JSON.stringify(data));

    // this.router.navigate(['/registerExhibit']);
  };
  onSave = (form: FormGroup, cb: (res: string) => void): void => {
    // sort form value by interface keys
    const formRawValue = form.getRawValue();
    delete formRawValue.navigator;

    if (!(formRawValue["internal_number"]
       && formRawValue["received_or_go"]
       && formRawValue["lab_name"]
       && formRawValue["event_characteristic"]
       && formRawValue["district"]
       && formRawValue["investigating_unit"])
    ) {
      alert("Fields are required!")
      return;
    }

    //sort formRawValue by  order of Case interface
    localStorage.setItem('case', JSON.stringify(formRawValue));
    console.log(formRawValue);
  }
  //onExhibits = (form: FormGroup, cb: (res: string) => void): void => {

  //  alert(JSON.stringify(form))
  //  const formRawValue = form.getRawValue();
  //  if (!(formRawValue["internal_number"]
  //    && formRawValue["received_or_go"]
  //    && formRawValue["lab_name"]
  //    && formRawValue["event_characteristic"]
  //    && formRawValue["district"]
  //    && formRawValue["investigating_unit"])
  //  ) {
  //    alert("Fields are required!")
  //    return;
  //  } else {
  //    alert("YAY")
  //  }

  //  this.router.navigate(['/exhibitNavigator']);

  //}

}
