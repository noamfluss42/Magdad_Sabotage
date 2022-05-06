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
  form = new FormGroup({});

  constructor(
    private service: CasesService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
    this.tags$ = service.getTags();

  }

  ngOnInit(): void {


  }
  //TODO: add a method to combine tags and form data together to send to the server
  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    // merge from.getRawValue data with tags
    const data = { ...form.getRawValue(), ...this.tags$ };
    const formRawValue = form.getRawValue();

    this.service.postCase(formRawValue).subscribe((res: any) => {
      cb(res);
    });
    this.sharedData.addToData(formRawValue);
    this.router.navigate(['/registerExhibit']);
  };
  onSave = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();

    this.service.postCase(formRawValue).subscribe((res: any) => {
      cb(res);
    });
  }
}
