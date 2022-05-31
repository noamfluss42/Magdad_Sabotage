import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import type { Observable } from 'rxjs';
import { Constants } from '../constants/constants';
import { DropdownField, TextboxField, DatePickerField, ButtonField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import type { Case } from '../utils/types';
import { formatDate } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  caseURL = `${Constants.API_URL}/case/`;
  constructor(private http: HttpClient,private router: Router) {}

  // return Observable of Case[]
  getCase() {
    return this.http.get<Case[]>(this.caseURL);
  }
  /* POST: add new Case do database */

  // In Typescript 'case' is an illegal parameter name, therefore we use 'case_'
  postCase(case_: Case): Observable<Case> {
    return this.http.post<Case>(this.caseURL + case_.internal_number.split('.')[0], case_, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /* GET case fields that contains search term */
  searchCaseFields(term: string): Observable<Case[]> {
    term = term.trim();
    const options = term ? { params: new HttpParams().set('name', term) } : {};
    return this.http.get<Case[]>(this.caseURL, options);
  }

  /* DELETE: delete case by id on the server.*/
  deleteCase(id: number): Observable<unknown> {
    return this.http.delete(`${this.caseURL}/${id}`);
  }
  /*TODO check merge */
  /* UPDATE: update the case field on the server. Returns the updated case upon success. */
  updateCase(case_: Case): Observable<Case> {
    return this.http.put<Case>(this.caseURL + case_.internal_number.split('.')[0], case_, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }


  /*TODO check merge */
  cacheCaseOnReturn(case_: Case) {
    localStorage.setItem('case', JSON.stringify(case_));
  }

  // get this year
  getFullYear(): number {
    const date = new Date();
    return date.getFullYear();
  }
  getShortYear(): number {
    return this.getFullYear() - 2000;
  }

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      // new TextboxField({
      //   key: 'internal_number', // +year
      //   label: 'מספר פנימי',
      //   required: true,
      //   type: 'text',
      //   value: this.generateInternalNumber(),
      // }),
      new DropdownField({
        key: 'received_or_go',
        label: 'יציאה/קבלה',
        required: true,
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
        required: true,
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
        required: false,
        options: [
          { key: 'פלילי', value: 'פלילי' },
          { key: 'פח"ע', value: 'פח"ע' },
        ],
      }),

      new TextboxField({
        key: 'pele_number',
        required: false,
        label: "'מס" + ' פלא',
        type: 'text',
        value: '' + '.' + this.getFullYear().toString(),
      }),

      new DropdownField({
        key: 'district',
        label: 'מחוז',
        required: true,
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
        required: true,
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
        required: false,
        options: [
          { key: 'פיצוץ', value: 'פיצוץ' },
          { key: 'נטרול', value: 'נטרול' },
        ],
      }),

      new TextboxField({
        key: 'reference_number',
        label: 'סימוכין',
        required: false,
        type: 'text',
      }),

      new DropdownField({
        key: 'status',
        label: 'סטטוס',
        required: false,
        options: [
          { key: 'פתוח', value: 'פתוח' },
          { key: ' סגור לללא חווד', value: ' סגור לללא חווד' },
          { key: 'סגור חווד', value: 'סגור חווד' },
        ],
      }),
      new TextboxField({
        key: 'sender_name',
        label: 'שם המומחה',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'event_location',
        label: 'מקום האירוע',
        required: false,
        type: 'text',
      }),


      new TextboxField({
        key: 'event_description',
        label: 'תיאור האירוע',
        required: false,
        type: 'text',
      }),


      new ButtonField({
        key:'navigator',
        label: 'תנועת מוצגים',
        type: 'redirect',
        required: false,
        onClick: () => {
          this.router.navigate(['/exhibitNavigator']);
        }
      }),

      // new TextboxField({
      //   key: 'sender_rank',
      //   label: 'דרגה ',
      //   required: true,
      //   type: 'text',
      // }),

      // new TextboxField({
      //   key: 'sender_serial_number',
      //   label: "מס' אישי ",
      //   required: true,
      //   type: 'text',
      // }),

      // new TextboxField({
      //   key: 'phone_number',
      //   label: 'מספר טלפון ',
      //   required: true,
      //   type: 'text',
      // }),
    ];
    return questions;
  }

  getTags() {
    const tags: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'weapon_name',
        label: 'מט"ח: חנ"מ' + "  " + 'אמל"ח: שם הפריט',
        required: false,
        type: 'text',
      }),
      // new TextboxField({
      //   key: 'explosive_device_material',
      //   label: 'מט"ח: חנ"מ',
      //   required: false,
      //   type: 'text',
      // }),
      new TextboxField({
        key: 'explosive_device_means',
        label: 'מט"ח: אמצעי ייזום'+ "  "+'אמל"ח: הגדרות',
        required: false,
        type: 'text',
      }),
      // new TextboxField({
      //   key: 'weapon_options',
      //   label: 'אמל"ח: הגדרות',
      //   required: false,
      //   type: 'text',
      // }),
      new TextboxField({
        key: 'explosive_device_operating_system',
        label: 'מט"ח: מע' + "' הפעלה"+ "  "+ 'אמל"ח: סימון',
        required: false,
        type: 'text',
      }),
      // new TextboxField({
      //   key: 'weapon_mark',
      //   label: 'אמל"ח: סימון',
      //   required: false,
      //   type: 'text',
      // }),
      new TextboxField({
        key: 'explosive_device_spray',
        label: 'מט"ח: רסס'+ "  "+ 'אמל"ח: צבע',
        required: false,
        type: 'text',
      }),
      // new TextboxField({
      //   key: 'weapon_color',
      //   label: 'אמל"ח: צבע',
      //   required: false,
      //   type: 'text',
      // }),
      new TextboxField({
        key: 'explosive_device_camouflage',
        label: 'מט"ח: הסוואה' + "  "+ 'אמל"ח: מאפיינים נוספים',
        required: false,
        type: 'text',
      }),
      // new TextboxField({
      //   key: 'weapon_additional_characteristics',
      //   label: 'אמל"ח: מאפיינים נוספים',
      //   required: false,
      //   type: 'text',
      // }),

    ];
    return tags;
  }

  getGenerateDocxButton() {
    const button: FormFieldBase<string>[] = [
      new ButtonField({
        label: 'יצירת טופס ושליחה למעבדה',
        onClick: () => {
          this.router.navigate(['/genLabForm']);
        },
      }),
    ];
    return button;
  }

}
