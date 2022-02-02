import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldBase } from '../utils/form-field-base';
@Injectable({
  providedIn: 'root'
})
export class FieldControlService {

  constructor() { }
  toFormGroup(questions: FormFieldBase<string>[] ) {
    const group: any = {};
    
    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
