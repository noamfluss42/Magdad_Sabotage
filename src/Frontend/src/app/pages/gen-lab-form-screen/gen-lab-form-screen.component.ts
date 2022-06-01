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

    // Gets case's data from local storage.
    const localCase = JSON.parse(localStorage.getItem('case') || '[]');
    // Converts fields into array and auto fills case number.
    var values = Array.from(this.fields$.values())
    values[0]["value"] = localCase.internal_number

  }

  ngOnInit(): void {}

  // will be called after child form submits.
  // Function must be defined as arrow function otherwise 'this' keyword will refer to
  // DynamicFormComponent insted of this(RegisterExhibitScreenComponent) component.
  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();
    this.sharedData.addToData(formRawValue);
    this.sharedData.prepareForDocx();
    cb(JSON.stringify(formRawValue));
  };
}
