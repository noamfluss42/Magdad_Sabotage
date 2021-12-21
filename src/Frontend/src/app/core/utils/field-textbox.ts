import { FormFieldBase } from './form-field-base';

export class TextboxField extends FormFieldBase<string> {
  override controlType = 'textbox';
}
