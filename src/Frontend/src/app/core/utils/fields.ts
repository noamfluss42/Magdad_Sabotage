import { FormFieldBase } from './form-field-base';

export class CheckboxField extends FormFieldBase<string> {
  override controlType = 'checkbox';
}

export class DatePickerField extends FormFieldBase<string> {
  override controlType = 'datepicker';
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
