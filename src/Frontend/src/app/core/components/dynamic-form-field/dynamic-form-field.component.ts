import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatCheckboxDefaultOptions,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { formatDate } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormFieldBase } from '../../utils/form-field-base';
import { useDebugValue } from 'react';

export const DATE_FORMAT = {
  parse: {
    dateInput: 'd/m/YYYY',

  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['../../../styles/dynamic-form-field.component.css'],
  providers: [{provide: MAT_DATE_FORMATS,useValue: DATE_FORMAT}],
})
export class DynamicFormFieldComponent {
  /*
   * This Component is used to create a from field as html.
   * Switches between the types according to field.controlType.
   * This is used in the DynamicFormComponent.
   */
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
