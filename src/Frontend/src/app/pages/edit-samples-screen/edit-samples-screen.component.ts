import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from 'src/app/core/services/field-control.service';
import { SamplesService } from 'src/app/core/services/samples.service';
import { FormFieldBase } from 'src/app/core/utils/form-field-base';

@Component({
  selector: 'app-edit-samples-screen',
  templateUrl: './edit-samples-screen.component.html',
  styleUrls: ['./edit-samples-screen.component.css']
})
export class EditSamplesScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  field$: FormFieldBase<string> = new FormFieldBase<string>();
  data: any;
  form!: FormGroup;
  constructor(
    private service: SamplesService,
    private fcs: FieldControlService
  ) {
    this.fields$ = service.getQuestions();
    this.field$ = this.fields$[1];
    this.form = this.fcs.toFormGroup([this.field$]);
  }

  ngOnInit(): void {
  }

  onFieldsInit = (form: FormGroup): void => {
    this.data = JSON.parse(localStorage.getItem('sample') || '{}');
    // form.controls['exhibit_number'].setValue(this.data.exhibit_number);
    // go over this.data and set the value of the form

    // go ovewr JSON object and set the value of the form
    for (let key in this.data) {
      if (form.controls[key]) {
        form.controls[key].setValue(this.data[key]);
      }
    }
  }

  onSubmit= (form: FormGroup): void => {

    this.service.editSample(form.getRawValue()).subscribe((res: any) => {
      console.log(res);
    }
    );
    localStorage.removeItem('sample');
  }
}
