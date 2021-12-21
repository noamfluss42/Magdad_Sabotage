import { Component, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormFieldBase } from '../../utils/form-field-base';
@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  // styleUrls: ['../../../styles/dynamic-form-field.component.css']
})
export class DynamicFormFieldComponent{

  constructor() { }
  @Input() field!: FormFieldBase<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid;

}
}
