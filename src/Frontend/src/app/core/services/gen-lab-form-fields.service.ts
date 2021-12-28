import { Injectable } from '@angular/core';
import { TextboxField } from '../utils/field-textbox';
import { CheckboxField } from '../utils/field-checkbox';
import { FormFieldBase } from '../utils/form-field-base';
import { DropdownField } from '../utils/field-dropdown';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GenLabFormFieldsService {
  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'recipient',
        label: 'אל',
        options: [
          { key: 'מעבדה ביולוגית', value: 'מעבדה ביולוגית' },
          { key: 'מעבדת פיתוח ט"א ', value: 'מעבדת פיתוח ט"א' },
          { key: ' מעבדה ביולוגית ומעבדת פיתוח ט"א', value: 'מעבדה ביולוגית ומעבדת פיתוח ט"א' },
          { key: ' מעבדת אלקטרוניקה', value: 'מעבדת אלקטרוניקה' },
          { key: ' חוקר זירה במחוז', value: 'חוקר זירה במחוז' },
          { key: ' מעבדת סימנים', value: ' מעבדת סימנים' },
          { key: ' מעבדת דליקים', value: 'מעבדת דליקים' },
          { key: ' חי"ק ענף טכני ל"א', value: 'חי"ק ענף טכני ל"א' },
          { key: ' מעבדת סיבים ופולימרים', value: 'מעבדת סיבים ופולימרים' },
          { key: ' מעבדת ניידת לזירת עבירה מחוז צפון', value: 'מעבדת ניידת לזירת עבירה מחוז צפון' },
        ],
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
        key: 'hazards',
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
        key: 'notes',
        label: 'הערות',
        required: true,
        type: 'text',
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
