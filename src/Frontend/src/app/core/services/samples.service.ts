import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { TextboxField } from '../utils/fields';
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
        label: 'מספר מוצג',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'bag_number',
        label: 'מה נדגם',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_description',
        label: 'מאיפה נדגם',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_packaging',
        label: 'אריזה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_mark',
        label: 'סימון',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_mark',
        label: 'הועבר למעבדה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_mark',
        label: 'תאריך שליטה',
        required: true,
        type: 'date',
      }),
      new TextboxField({
        key: 'exhibit_mark',
        label: 'תאריך קבלה',
        required: true,
        type: 'date',
      }),
      new TextboxField({
        key: 'exhibit_mark',
        label: 'תוצאות',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_mark',
        label: 'הערות',
        required: true,
        type: 'text',
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

}
