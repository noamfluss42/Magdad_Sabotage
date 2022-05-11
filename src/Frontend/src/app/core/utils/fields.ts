import { DatePipe, formatDate } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { FormFieldBase } from './form-field-base';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export class CheckboxField extends FormFieldBase<string> {
  override controlType = 'checkbox';
}

export class DatePickerField extends FormFieldBase<string> {
  override controlType = 'datepicker';


  // set dateFormat(date: string) {
  //     this.value =
  //   moment(new Date(date)).format(
  //     'DD/MM/YYYY').toString();

  // }
  // set dateFormat(date: string) {
  //   this.value = moment(new Date(date)).format('DD/MM/YYYY').toString();
  // }
}

export class DropdownField extends FormFieldBase<string> {
  override controlType = 'dropdown';
}

export class TextboxField extends FormFieldBase<string> {
  override controlType = 'textbox';
}
export class SeparatorField extends FormFieldBase<string> {
  override controlType = 'separator';
}
export class ButtonField extends FormFieldBase<string> {
  override controlType = 'button';
}
