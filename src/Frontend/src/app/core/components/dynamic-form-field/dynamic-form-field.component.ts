import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatCheckboxDefaultOptions,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { formatDate } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormFieldBase } from '../../utils/form-field-base';
import {MomentDateModule,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { default as _rollupMoment } from 'moment';




const moment = _rollupMoment || _moment;


export const DATE_FORMAT = {
  parse: {
    dateInput: 'dd/MM/y',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['../../../styles/dynamic-form-field.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class DynamicFormFieldComponent {
  /*
   * This Component is used to create a from field as html.
   * Switches between the types according to field.controlType.
   * This is used in the DynamicFormComponent.
   */
  @Input() field!: FormFieldBase<string>;
  @Input() form!: FormGroup;
  dates: any;
  constructor() {


    // add date to the field
  }



  get isValid() {
    return this.form.controls[this.field.key].valid;
  }






}
