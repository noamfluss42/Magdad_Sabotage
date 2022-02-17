import { FormFieldBase } from './form-field-base';

export class CheckboxField extends FormFieldBase<string> {
  override controlType = 'checkbox';
}
