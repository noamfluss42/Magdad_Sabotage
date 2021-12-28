import { Injectable } from '@angular/core';
import { TextboxField } from '../utils/field-textbox';
import { FormFieldBase } from '../utils/form-field-base';
import { DropdownField } from '../utils/field-dropdown';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenLabFormFieldsService {

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'addressee',
        label: 'אל',
        required: true,
        type: 'text',
      }),
      new DropdownField({
        key: 'urgency',
        label: 'דחיפות',
        options: [
          { key: 'רגיל', value: 'רגיל' },
          { key: 'דחוף', value: 'דחוף' },
          { key: 'דחוף מעצר', value: 'דחוף מעצר' },
        ],
      }),

      new DropdownField({
        key: 'risks',
        label: 'סיכונים',
        options: [
          { key: 'ביולוגי', value: 'ביולוגי' },
          { key: 'רעיל', value: 'רעיל' },
          { key: 'מוצג חד', value: 'מוצג חד' },
        ],
      }),
      new DropdownField({
        key: 'exhibits',
        label: 'מוצגים',
        options: [
          { key: 'רגיל', value: 'רגיל' },
          { key: 'נוסף', value: 'נוסף' },
          { key: 'חוזר', value: 'חוזר' },
        ],
      }),
      new TextboxField({
        key: 'testEssence',
        label: 'מהות הבדיקה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'comments',
        label: 'הערות',
        required: true,
        type: 'text',
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }}
