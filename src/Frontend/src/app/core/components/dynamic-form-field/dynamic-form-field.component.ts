import { Component, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { FormFieldBase } from '../../utils/form-field-base';
@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['../../../styles/dynamic-form-field.component.css'],
})
export class DynamicFormFieldComponent {




  @Input() field!: FormFieldBase<string>;
  @Input() form!: FormGroup;
  constructor() {
    // this.field = new FormControl(this.options.value);
    // this.form.addControl(this.field.key, this.field);
  }

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }
}
