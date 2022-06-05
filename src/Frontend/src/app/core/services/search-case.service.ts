import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';
import { DropdownField, TextboxField, DatePickerField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import { Case, CaseSearch, ResultCaseTable, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class SearchCaseService {
  queryUrl = `${Constants.API_URL}/query/`;
  constructor(private http: HttpClient, private router: Router) {}
  // return Observable of Case[]
  getQuery() {
    return this.http.get<CaseSearch>(this.queryUrl);
  }

  /* POST: add new Case do database */

  // In Typescript 'case' is an illegal parameter name, therfore we use 'case_'
  postQuery(case_: CaseSearch): Observable<CaseSearch> {
    console.log(case_);
    return this.http.post<CaseSearch>(this.queryUrl, case_, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  // //sets data for the search case result screen

  getData(): any {
    // returns data from local storage and check if null
    const data = sessionStorage.getItem('results');
    if (data) {
      return JSON.parse(data);
    }
    return JSON.parse('[]');
  }

  //TODO CHECK QUERY
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
  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'internal_number', // +year
        label: 'מספר פנימי',
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

        options: [
          { key: 'weapons', value: 'אמל"ח' },
          { key: 'explosive_device', value: 'מטען חבלה' },
          { key: 'fireworks', value: 'זיקוקין' },
          { key: 'query', value: 'בדיקות/שאילתה' },
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

        type: 'text',
      }),

      new DropdownField({
        key: 'status',
        label: 'סטטוס',
        options: [
          { key: 'פתוח', value: 'פתוח' },
          { key: ' סגור ללא חווד', value: ' סגור ללא חווד' },
          { key: 'סגור חווד', value: 'סגור חווד' },
        ],
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

        type: 'text',
      }),

      new TextboxField({
        key: 'event_description',
        label: 'תיאור האירוע',

        type: 'text',
      }),

      new TextboxField({
        key: 'sender_name',
        label: 'שם המומחה',

        type: 'text',
      }),

      new DatePickerField({
        key: 'min_date',
        label: 'טווח תאריך התחלה',
        type: 'text',
      }),
      new DatePickerField({
        key: 'max_date',
        label: 'טווח תאריך סוף',
        type: 'text',
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
  getTableColumns(): TableColumn[] {
    return [
      {
        name: 'תאריך קבלה',
        attribute: 'received_date',
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
        name: 'עריכה',
        attribute: 'עריכה',
        sortable: true,
        onClick: (_case: Case) => {
          console.log(_case);
          // local storage exhibit
          localStorage.removeItem('query');
          //alert("after query internal number"+_case.internal_number)
          localStorage.setItem('caseQ', JSON.stringify(_case))
          localStorage.setItem('internal_number', JSON.stringify(_case.internal_number));
          this.router.navigate(['/editCaseScreen']);
        },
      },
    ].reverse();
  }
}
