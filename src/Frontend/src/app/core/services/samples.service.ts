import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { DatePickerField, DropdownField, TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
//import { Exhibit, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  constructor() { }

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'case_id',
        label: 'מספר תיק',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_id',
        label: 'מספר מוצג',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'sample_id',
        label: 'מספר דגימה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'what_sampled',
        label: 'מה נדגם',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'where_sampled',
        label: 'מאיפה נדגם',
        required: true,
        type: 'text',
      }),
      new DropdownField({
        key: 'transferred_to_lab',
        label: 'שם מעבדה',
        required: true,
        options: [
          { key: "south", value: "דרום" },
          { key: "tel_aviv", value: "תל אביב" },
          { key: "north", value: "צפון" },
          { key: "metar", value: "מתא\"ר" },
        ]
      }),
      new DatePickerField({
        key: 'sending_date',
        label: 'תאריך שליחה',
        required: true,
        type: 'date',
      }),
      new DatePickerField({
        key: 'receiving_date',
        label: 'תאריך קבלה',
        required: true,
        type: 'date',
      }),
      new TextboxField({
        key: 'packaging',
        label: 'אריזה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'results',
        label: 'תוצאות',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'notes',
        label: 'הערות',
        required: true,
        type: 'text',
      }),
      new DatePickerField({
        key: 'date',
        label: 'תאריך',
        required: true,
        type: 'date',
      }),
      new TextboxField({
        key: 'unit_name',
        label: 'שם יחידה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'reference',
        label: 'סימוכין',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'investigator_name',
        label: 'שם חוקר',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'phone_num',
        label: 'מספר טלפון',
        required: true,
        type: 'text',
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

}
