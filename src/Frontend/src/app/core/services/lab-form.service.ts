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
        key: 'recipient',
        label: 'אל',
        options: [
          { key: 'מעבדה ביולוגית', value: 'מעבדה ביולוגית' },
          { key: 'מעבדת פיתוח ט"א ', value: 'מעבדת פיתוח ט"א' },
          {
            key: ' מעבדה ביולוגית ומעבדת פיתוח ט"א',
            value: 'מעבדה ביולוגית ומעבדת פיתוח ט"א',
          },
          { key: ' מעבדת אלקטרוניקה', value: 'מעבדת אלקטרוניקה' },
          { key: ' חוקר זירה במחוז', value: 'חוקר זירה במחוז' },
          { key: ' מעבדת סימנים', value: ' מעבדת סימנים' },
          { key: ' מעבדת דליקים', value: 'מעבדת דליקים' },
          { key: ' חי"ק ענף טכני ל"א', value: 'חי"ק ענף טכני ל"א' },
          { key: ' מעבדת סיבים ופולימרים', value: 'מעבדת סיבים ופולימרים' },
          {
            key: ' מעבדת ניידת לזירת עבירה מחוז צפון',
            value: 'מעבדת ניידת לזירת עבירה מחוז צפון',
          },
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
          { key: 'toxic', value: 'רעיל' , checked: false},
          { key: 'sharp', value: 'חד' ,checked: false},
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
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'notes',
        label: 'הערות',
        required: true,
        type: 'text',
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
