import { Injectable } from '@angular/core';
import { TextboxField, CheckboxField, DropdownField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';

@Injectable({
  providedIn: 'root',
})
export class LabFormService {
  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'internal_number',
        required: true,
        label: 'מספר תיק',
      }),
      new DropdownField({
        key: 'transferred_to_lab',
        label: 'אל מעבדה',
        required: true,
        options: [
         { key: 'hanam', value: 'חנ"מ' },
         { key: 'ta', value: 'ט"א' },
         { key: 'biologically', value: 'ביולוגית' },
         { key: 'arsons', value: 'הצתות' },
         { key: 'signsAndMaterials', value: 'סימנים וחומרים' },
        ],
      }),
      new DropdownField({
        key: 'lab_name',
        label: 'מעבדה שולחת',
        required: true,
        options: [
          { key: 'דרום', value: 'דרום' },
          { key: 'תל אביב', value: 'תל אביב' },
          { key: 'צפון', value: 'צפון' },
          { key: 'מטא"ר', value: 'מטא"ר' },
        ],
      }),
      new DropdownField({
        key: 'urgency',
        label: 'דחיפות',
        options: [
          { key: 'normal', value: 'רגיל' },
          { key: 'urgent', value: 'דחוף' },
          { key: 'urgent_arrest', value: 'דחוף מעצר' },
        ],
      }),

      new CheckboxField({
        key: 'hazards',
        label: 'סיכונים',
        options: [
          { key: 'biological', value: 'ביולוגי', checked: false },
          { key: 'toxic', value: 'רעיל', checked: false },
          { key: 'sharp', value: 'חד', checked: false },
        ],
      }),
      new DropdownField({
        key: 'exhibits',
        label: 'מוצגים',
        options: [
          { key: 'normal', value: 'רגיל' },
          { key: 'additional', value: 'נוסף' },
          { key: 'returning', value: 'חוזר' },
        ],
      }),
      new TextboxField({
        key: 'testing_essence',
        label: 'מהות הבדיקה',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'notes',
        label: 'הערות',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'name',
        label: 'שם',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'rank',
        label: 'דרגה',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'person_id',
        label: 'מספר אישי',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'phone_number',
        label: 'מספר טלפון',
        required: false,
        type: 'text',
      })

    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
