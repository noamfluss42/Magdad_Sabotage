import { FormFieldBase } from "../utils/form-field-base";
import { DropdownField } from '../utils/field-dropdown';
import { TextboxField } from "../utils/field-textbox";
//!TODO: move fields here.!

export interface GenLabFormFields
{
  "recipient":string;
  "urgency":string;
  "hazards":string;
  "exhibits":string;
  "testEssence":string;
  "comments":string;
}
