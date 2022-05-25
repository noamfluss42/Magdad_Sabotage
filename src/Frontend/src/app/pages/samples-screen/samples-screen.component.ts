import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SamplesService } from 'src/app/core/services/samples.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { FormFieldBase } from '../../core/utils/form-field-base';

@Component({
  selector: 'app-samples-screen',
  templateUrl: './samples-screen.component.html',
  styleUrls: ['./samples-screen.component.css'],
})
export class SamplesScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];

  constructor(private service: SamplesService) {
    this.fields$ = this.service.getQuestions();

    const localExhibit = JSON.parse(localStorage.getItem('exhibit') || '[]');
    var values = Array.from(this.fields$.values())
    values[0]["value"] = localExhibit.case_id
    values[1]["value"] = localExhibit.exhibit_number
    values[14]["value"] = localExhibit.investigator_name

  }

  ngOnInit(): void {}

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    console.log(form.getRawValue());
    var does_exist = false;
    const formRawValue = form.getRawValue();
    this.service.getSample(formRawValue).subscribe((res: any) => {
      if (res.length > 0) {
        this.service.editSample(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      }
      if (!does_exist) {
        this.service.postSample(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      }

    });

  };
}
