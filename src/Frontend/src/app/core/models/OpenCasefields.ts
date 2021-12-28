import { FormFieldBase } from "../utils/form-field-base";
import { DropdownField } from '../utils/field-dropdown';
import { TextboxField } from "../utils/field-textbox";
//!TODO: move fields here.!

export interface OpenCaseFields
{
  "referenceType":string;
  "eventType":string;
  "district":string;
  "area":string;
  "station":string;
  "investigationUnit":string;
  "internalNumber":string;
  "internalNumberyear":string;
  'referenceNumber':string;
  'eventDate':string;
  'ReceivedDate':string;
  'signDate':string;
  'eventLocation':string;
  'eventDescription':string;
  'senderName':string;
  'senderRank':string;
  'sendSerialNumber':string;
  'labName':string;

}
