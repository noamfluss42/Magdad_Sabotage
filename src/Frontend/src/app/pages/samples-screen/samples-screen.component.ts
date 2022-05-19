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
  }

  ngOnInit(): void {}

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    console.log(form.getRawValue());
    this.service.postSample(form.value).subscribe((res: any) => {
      console.log(res);
      cb(res);
    });
  };
}
