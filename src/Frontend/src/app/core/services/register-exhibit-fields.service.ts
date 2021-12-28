import { Injectable } from '@angular/core';
import { TextboxField } from '../utils/field-textbox';
import { FormFieldBase } from '../utils/form-field-base';
import { DropdownField } from '../utils/field-dropdown';
import { of } from 'rxjs';

@Injectable()
export class RegisterExhibitFieldsService {

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
    new TextboxField({
    key: 'bagNumber', // +year
    label: '  מספר שקית',
    required: true,
    type: 'text',
  }),
  new TextboxField({
    key: 'ExhibitDescription', // +year
    label: 'תיאור המוצג',
    required: true,
    type: 'text',
  }),

  new TextboxField({
    key: 'pack',
    label: 'אריזה',
    required: true,
    type: 'text',
  }),

  new TextboxField({
    key: 'mark',
    label: 'סימון',
    required: true,
    type: 'text',
  }),

    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
