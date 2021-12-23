import { FormFieldBase } from './form-field-base';

export class DropdownField extends FormFieldBase<string> {
  override controlType = 'dropdown';
}
