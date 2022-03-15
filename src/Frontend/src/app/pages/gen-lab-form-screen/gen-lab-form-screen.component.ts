import { Component, OnInit } from '@angular/core';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { LabFormService } from 'src/app/core/services/lab-form.service';
import { FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gen-lab-form-screen',
  templateUrl: './gen-lab-form-screen.component.html',
  styleUrls: ['./gen-lab-form-screen.component.css'],
})
export class GenLabFormScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  constructor(
    private service: LabFormService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
  }

  ngOnInit(): void {}

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();
    this.sharedData.addToData(formRawValue);
    this.sharedData.prepareForDocx();
    cb(JSON.stringify(formRawValue));
  };
}
