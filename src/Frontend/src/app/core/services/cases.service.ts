import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { Constants } from '../constants/constants';
import { DropdownField, TextboxField, DatePickerField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import type { Case } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  //get year from date
  static getYear(date: Date): number {
    return date.getFullYear();
  }

  caseURL = `${Constants.API_URL}/case/`;
  constructor(private http: HttpClient) {}

  // return Observable of Case[]
  getCase() {
    return this.http.get<Case[]>(this.caseURL);
  }

  /* POST: add new Case do database */

  // In Typescript 'case' is an illegal parameter name, therfore we use 'case_'
  postCase(case_: Case): Observable<Case> {
    return this.http.post<Case>(this.caseURL, case_, {
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

  /* UPDATE: update the case field on the server. Returns the updated case upon success. */
  updateCase(case_: Case): Observable<Case> {
    return this.http.put<Case>(this.caseURL, case_, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      // new DropdownField({
      //   key: 'reference_type',
      //   label: 'סוג סימוכין',
      //   options: [{ key: 'פלא', value: 'פלא' }],
      // }),
      new TextboxField({
        key: 'internal_number', // +year
        label: 'מספר פנימי', // +year
        required: true,
        type: 'text',
        value:'/'+CasesService.getYear(new Date()),

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
        key: 'event_type',
        label: 'מאפיין אירוע',
        options: [
          { key: 'אמל"ח', value: 'אמל"ח' },
          { key: 'מטען חבלה', value: 'מטען חבלה' },
          { key: 'זיקוקין', value: 'זיקוקין' },
          { key: 'בדיקות/שאילתה', value: 'בדיקות/שאילתה' },
        ],

      }),

      new DropdownField({
        key: 'case_type',
        label: 'סוג אירוע',
        options: [
          { key: 'פלילי', value: 'פלילי' },
          { key: 'פח"ע', value: 'פח"ע' },
        ],
      }),
      new DatePickerField({
        key: 'event_date',
        label: 'תאריך אירוע',
        required: true,
        type: 'text',
      }),

      new DatePickerField({
        key: 'received_date',
        label: 'תאריך קבלה',
        required: true,
        type: 'text',
      }),



      new DropdownField({
        key: 'district',
        label: 'מחוז',
        options: [
          { key: 'מחוז צפון', value: 'מחוז צפון' },
          { key: 'מחוז חוף', value: 'מחוז חוף' },
          { key: 'מחוז מחוז', value: 'מחוז מרכז' },
          { key: 'מחוז תל אביב', value: 'מחוז תל אביב' },
          { key: 'מחוז ירושלים', value: 'מחוז ירושלים' },
          { key: ' מחוז ש"י ', value: 'מחוז ש"י' },
          { key: ' מחוז דרום ', value: 'מחוז דרום' },
        ],
      }),
      // need data
      // new DropdownField({
      //   key: 'area',
      //   label: 'מרחב',
      //   options: [{ key: 'מרחב צפון', value: 'מרחב צפון' }],
      // }),
      // new DropdownField({
      //   key: 'station',
      //   label: 'תחנה',
      //   options: [
      //     { key: 'בין שאן', value: 'בין שאן' },
      //     { key: 'טבריה', value: 'טבריה' },
      //     { key: 'כנא', value: 'כנא' },
      //     { key: 'מגדל העמק', value: 'מגדל העמק' },
      //     { key: 'נצרת', value: 'נצרת' },
      //     { key: ' נצרת עילית', value: 'נצרת עילית' },
      //     { key: ' עפולה', value: 'עפולה' },
      //     { key: ' שפרעם', value: 'שפרעם' },
      //   ],
      // }),
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

      /*
    במחוז צפון ישנם שלושה מרחבים: כינרת, עמקים וגליל. | במחוז דרום ישנם שלושה מרחבים: לכיש, נגב ואילת. | במחוז מרכז ישנם שלושה מרחבים: שרון, שפלה ונתב"ג. | במחוז ת"א ישנם ארבעה מרחבים: ירקון, דן, איילון ויפתח. | במחוז ש"י ישנם שני מרחבים: חברון ושומרון. | במחוז ירושלים ישנם שלושה מרחבים: דוד, קדם וציון. | במחוז חוף יש שני מרחבים: אשר ומנשה.
    */

      // new TextboxField({
      //   key: 'internal_number_year', // +year
      //   label: 'מספר פנימי שנה',
      //   required: true,
      //   type: 'text',
      // }),

      new TextboxField({
        key: 'reference_number',
        label: 'מספר סימוכין',
        required: true,
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

      // new TextboxField({
      //   key: 'sender_name',
      //   label: 'שם ',
      //   required: true,
      //   type: 'text',
      // }),

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

      // new DropdownField({
      //   key: 'lab_name',
      //   label: 'שם מעבדה ',
      //   options: [
      //     { key: 'מעבדת חבלה דרום', value: 'מעבדת חבלה דרום' },
      //     { key: 'מעבדת חבלה ת"א', value: 'מעבדת חבלה ת"א' },
      //     { key: 'מעבדת חבלה צפון', value: 'מעבדת חבלה צפון' },
      //     { key: 'מעבדת חבלה ירושלים', value: 'מעבדת חבלה ירושלים' },
      //   ],
      // }),

      // new TextboxField({
      //   key: 'phone_number',
      //   label: 'מספר טלפון ',
      //   required: true,
      //   type: 'text',
      // }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
