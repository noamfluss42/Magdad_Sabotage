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

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new DropdownField({
        key: 'reference_type',
        label: 'סוג סימוכין',
        options: [{ key: 'פלא', value: 'פלא' }],
      }),
      new DropdownField({
        key: 'event_type',
        label: 'סוג אירוע',
        options: [
          { key: 'פלילי', value: 'פלילי' },
          { key: 'פח"ע', value: 'פח"ע' },
        ],
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
      new DropdownField({
        key: 'area',
        label: 'מרחב',
        options: [{ key: 'מרחב צפון', value: 'מרחב צפון' }],
      }),
      new DropdownField({
        key: 'station',
        label: 'תחנה',
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
      new TextboxField({
        key: 'internal_number', // +year
        label: 'מספר פנימי',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'internal_number_year', // +year
        label: 'מספר פנימי שנה',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'reference_number',
        label: 'מספר סימוכין',
        required: true,
        type: 'text',
      }),

      new DatePickerField({
        key: 'min_date',
        label: 'תאריך אירוע טווח התחלה',
        required: true,
        type: 'text',
      }),
      new DatePickerField({
        key: 'max_date',
        label: 'תאריך אירוע טווח סוף',
        required: true,
        type: 'text',
      }),

      new DatePickerField({
        key: 'received_date',
        label: 'תאריך קבלה',
        required: true,
        type: 'text',
      }),

      new DatePickerField({
        key: 'sign_date',
        label: 'תאריך הזנה',
        required: true,
        type: 'text',
      }),

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
        label: 'שם ',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'sender_rank',
        label: 'דרגה ',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'sender_serial_number',
        label: "מס' אישי ",
        required: true,
        type: 'text',
      }),

      new DropdownField({
        key: 'lab_name',
        label: 'שם מעבדה ',
        options: [
          { key: 'מעבדת חבלה דרום', value: 'מעבדת חבלה דרום' },
          { key: 'מעבדת חבלה ת"א', value: 'מעבדת חבלה ת"א' },
          { key: 'מעבדת חבלה צפון', value: 'מעבדת חבלה צפון' },
          { key: 'מעבדת חבלה ירושלים', value: 'מעבדת חבלה ירושלים' },
        ],
      }),

      new TextboxField({
        key: 'phone_number',
        label: 'מספר טלפון ',
        required: true,
        type: 'text',
      }),
      new TextboxField({
      key:'weapon_name',
      label:'אמל"ח: שם הפריט',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:"explosive_device_material",
      label: 'מט"ח: חנ"מ',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'explosive_device_means',
      label:'מט"ח: אמצעי ייזום',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'weapon_options',
      label:'אמל"ח: הגדרות',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'explosive_device_operating_system',
      label:'מט"ח: מע' +"' הפעלה",
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'weapon_mark',
      label:'אמל"ח: סימון',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'explosive_device_spray',
      label:'מט"ח: רסס',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'weapon_color',
      label:'אמל"ח: צבע',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'explosive_device_camouflage',
      label:'מט"ח: הסוואה',
      required: true,
      type: 'text',
    }),
    new TextboxField({
      key:'weapon_additional_characteristics',
      label:'אמל"ח: מאפיינים נוספים',
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
