import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';
import { DropdownField, TextboxField, DatePickerField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import {CaseSearch, ResultCaseTable, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class SearchCaseService {
  queryUrl = `${Constants.API_URL}/query`;
  constructor(private http: HttpClient) { }
    // return Observable of Case[]
    getQuery() {
      return this.http.get<CaseSearch[]>(this.queryUrl);
    }

    /* POST: add new Case do database */

    // In Typescript 'case' is an illegal parameter name, therfore we use 'case_'
    postQuery(case_: CaseSearch): Observable<CaseSearch> {
      return this.http.post<CaseSearch>(this.queryUrl, case_, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    // //sets data for the search case result screen
    setData(data: any) {
      localStorage.setItem('data', JSON.stringify(data));
    }
    getData(): any { // returns data from local storage and check if null
      const data = localStorage.getItem('data');
      if (data) {
        return JSON.parse(data);
      }
      return null;
    }
    free(data: any) {
      localStorage.removeItem('data');
    }
    getTags() {
      const tags: FormFieldBase<string>[] = [
        new TextboxField({
          key: 'weapon_name',
          label: 'אמל"ח: שם הפריט',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'explosive_device_material',
          label: 'מט"ח: חנ"מ',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'explosive_device_means',
          label: 'מט"ח: אמצעי ייזום',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'weapon_options',
          label: 'אמל"ח: הגדרות',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'explosive_device_operating_system',
          label: 'מט"ח: מע' + "' הפעלה",
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'weapon_mark',
          label: 'אמל"ח: סימון',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'explosive_device_spray',
          label: 'מט"ח: רסס',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'weapon_color',
          label: 'אמל"ח: צבע',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'explosive_device_camouflage',
          label: 'מט"ח: הסוואה',
          required: true,
          type: 'text',
        }),
        new TextboxField({
          key: 'weapon_additional_characteristics',
          label: 'אמל"ח: מאפיינים נוספים',
          required: true,
          type: 'text',
        }),

      ];
      return tags;
    }
  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'internal_number', // +year
        label: 'מספר פנימי',
        required: true,
        type: 'text',
      }),
      new DropdownField({
        key: 'received_or_go',
        label: 'יציאה/קבלה',
        options: [
          { key: 'יציאה לאירוע', value: 'יציאה לאירוע' },
          { key: 'קבלת אירוע', value: 'קבלת אירוע' },
        ],
      }),
      new DropdownField({
        key: 'lab_name',
        label: 'שם מעבדה ',
        required: true,
        options: [
          { key: 'דרום', value: 'דרום' },
          { key: 'תל אביב', value: 'ת"א' },
          { key: 'צפון', value: 'צפון' },
          { key: 'מטא"ר', value: 'מטא"ר' },
        ],
      }),
      new DropdownField({
        key: 'event_characteristic',
        label: 'מאפיין האירוע',
        required: true,
        options: [
          { key: 'אמל"ח', value: 'אמל"ח' },
          { key: 'מטען חבלה', value: 'מטען חבלה' },
          { key: 'זיקוקין', value: 'זיקוקין' },
          { key: 'בדיקות/שאילתה', value: 'בדיקות/שאילתה' },
        ],
      }),
      new DatePickerField({
        key: 'event_date',
        label: 'תאריך אירוע',
        type: 'text',
      }),
      new DatePickerField({
        key: 'received_date',
        label: 'תאריך קבלה',
        required: true,
        type: 'text',
      }),

      new DropdownField({
        key: 'event_type',
        label: 'סוג אירוע',
        options: [
          { key: 'פלילי', value: 'פלילי' },
          { key: 'פח"ע', value: 'פח"ע' },
        ],
      }),

      new TextboxField({
        key: 'pele_number',
        label: "'מס" + ' פלא',
        type: 'text',
      }),

      new DropdownField({
        key: 'district',
        label: 'מחוז',
        options: [
          { key: 'צפון', value: 'צפון' },
          { key: 'מטא"ר', value: 'מטא"ר' },
          { key: 'תל אביב', value: 'תל אביב' },
          { key: ' דרום ', value: 'דרום' },
        ],
      }),
      new DropdownField({
        key: 'investigating_unit',
        label: 'יחידת חקירות',
        options: [
          { key: 'בין שאן', value: 'בין שאן' },
          { key: 'טבריה', value: 'טבריה' },
          { key: 'כנא', value: 'כנא' },
          { key: 'מגדל העמק', value: 'מגדל העמק' },
          { key: 'נצרת', value: 'נצרת' },
          { key: ' נצרת עילית', value: 'נצרת עילית' },
          { key: ' עפולה', value: 'עפולה' },
          { key: ' שפרעם', value: 'שפרעם' },
        ],
      }),

      new DropdownField({
        key: 'explosion_or_disarm',
        label: 'פיצוץ/נטרול',
        options: [
          { key: 'פיצוץ', value: 'פיצוץ' },
          { key: 'נטרול', value: 'נטרול' },
        ],
      }),

      new TextboxField({
        key: 'reference_number',
        label: 'סימוכין',
        required: true,
        type: 'text',
      }),

      new DropdownField({
        key: 'status',
        label: 'סטטוס',
        options: [
          { key: 'פתוח', value: 'פתוח' },
          { key: ' סגור לללא חווד', value: ' סגור לללא חווד' },
          { key: 'סגור חווד', value: 'סגור חווד' },
        ],
      }),

      new TextboxField({
        key: 'catch_report',
        label: 'דוח תפיסה',
        type: 'text',
      }),

      // new DatePickerField({
      //   key: 'sign_date',
      //   label: 'תאריך הזנה',
      //   required: true,
      //   type: 'text',
      // }),

      new TextboxField({
        key: 'event_location',
        label: 'מקום האירוע',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'event_description',
        label: 'תיאור האירוע',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'sender_name',
        label: 'שם המומחה',
        required: true,
        type: 'text',
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
  getTableColumns(): TableColumn[] {
    return [
      {
        name: 'מספר ',
        attribute: 'index',
        sortable: true,
        // set value to index
      },
      {
        name: 'מספר תיק',
        attribute: 'case_id',
        sortable: true,

      },
      {
        name: 'מעבדה',
        attribute: 'lab_name',
        sortable: true,
      },
      {
        name: ' תיאור אירוע',
        attribute: 'event_description',
        sortable: true,
      },
      {
        name: "מס' פנימי",
        attribute: 'internal_number',
        sortable: true,
      },
      {
        name: 'טווח אירוע התחלה',
        attribute: 'min_date',
        sortable: true,
      },
      {
        name: 'טווח אירוע סוף',
        attribute: 'max_date',
        sortable: true,
      },


    ].reverse();
  }

}
