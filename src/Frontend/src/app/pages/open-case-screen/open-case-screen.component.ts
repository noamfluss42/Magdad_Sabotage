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
    const savedCase =JSON.parse(localStorage.getItem('case') || '[]');
    // merge from.getRawValue data with tags
    const data = {...savedCase, ...form.getRawValue()};
    console.log(data);
    this.service.postCase(data).subscribe((res: any) => {
      cb(res);
    });
    this.sharedData.addToData(data);
  };

  onSave = (form: FormGroup, cb: (res: string) => void): void => {
    // sort form value by interface keys
    const formRawValue = form.getRawValue();
    delete formRawValue.navigator;


    //sort formRawValue by  order of Case interface
    localStorage.setItem('case', JSON.stringify(formRawValue));
    console.log(formRawValue);
  }
}
