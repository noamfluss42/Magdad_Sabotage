import { Injectable } from '@angular/core';
import { TextboxField } from '../utils/field-textbox';
import { FormFieldBase } from '../utils/form-field-base';
import { DropdownField } from '../utils/field-dropdown';
//TODO: fetch fields from enum
import { OpenCaseFields } from '../enums/open-case-fields';

import { of } from 'rxjs';

@Injectable()
export class OpenCaseFieldsService {
  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: FormFieldBase<string>[] = [

      new DropdownField({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxField({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
