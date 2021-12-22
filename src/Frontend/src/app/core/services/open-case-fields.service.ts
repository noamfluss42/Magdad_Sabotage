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
        key: 'district',
        label: 'מחוז',
        options: [
          {key: '',  value: ''},
          {key: '1', value: 'מחוז 1'},
          {key: '2', value: 'מחוז 2'},
          {key: '3', value: 'מחוז 3'},
        ],
      }),

      new DropdownField({
        key: 'area',
        label: 'מרחב',
        options: [
          {key: '',  value: ''},
          {key: '1', value: 'מרחב 1'},
          {key: '2', value: 'מרחב 2'},
          {key: '3', value: 'מרחב 3'},
        ],
      }),

      new DropdownField({
        key: 'station',
        label: 'תחנה',
        options: [
          {key: '',  value: ''},
          {key: '1', value: 'תחנה 1'},
          {key: '2', value: 'תחנה 2'},
          {key: '3', value: 'תחנה 3'},
        ],
      }),

      new DropdownField({
        key: 'unit',
        label: 'יחידת חקירות',
        options: [
          {key: '',  value: ''},
          {key: '1', value: 'יחידת חקירות 1'},
          {key: '2', value: 'יחידת חקירות 2'},
          {key: '3', value: 'יחידת חקירות 3'},
        ],
      }),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
