import { FormFieldBase } from './form-field-base';

export class DatePickerField extends FormFieldBase<string> {
  override controlType = 'datepicker';
}
