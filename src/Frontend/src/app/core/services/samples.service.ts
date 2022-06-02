import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { sample } from 'rxjs';
import { Constants } from '../constants/constants';
import { DatePickerField, DropdownField, TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import { Exhibit, Sample, TableColumn } from '../utils/types';
//import { Exhibit, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class SamplesService {
  constructor(private http: HttpClient, private router: Router) {}

  getSample(sample_id: string) {
    return this.http.get(`${Constants.API_URL}/samples/${sample_id}`, {
      responseType: 'json',
    });
  }

  deleteSample(internal_number: string) {
    return this.http.delete(`${Constants.API_URL}/samples/${internal_number}`, {
      responseType: 'json',
    });
  }
  editSample(sample: Sample) {
    return this.http.put<Sample>(
      `${Constants.API_URL}/samples/${sample.sample_id}`,
      sample,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    );
  }
  postSample(sample: Sample) {
    console.log(sample);
    return this.http.post(`${Constants.API_URL}/samples`, sample, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    });
  }

  getSamplesFromExhibit(case_internal_number:string,exhibit_number: string) {
    return this.http.get(`${Constants.API_URL}/get_samples_query/${case_internal_number}_${exhibit_number}`,{
      responseType: 'json',
    });
  }

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'internal_number',
        label: 'מספר תיק',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_number',
        label: 'מספר מוצג',
        required: true,
        type: 'text',
      }),
      // new TextboxField({
      //   key: 'sample_id',
      //   label: 'מספר דגימה',
      //   required: true,
      //   type: 'text',
      // }),
      new TextboxField({
        key: 'what_sampled',
        label: 'מה נדגם',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'where_sampled',
        label: 'מאיפה נדגם',
        required: false,
        type: 'text',
      }),
      new DropdownField({
        key: 'transferred_to_lab',
        label: 'מעבדת הבדיקה',
        required: true,
        type: 'text',
        options: [
         { key: 'חנ"מ', value: 'חנ"מ' },
         { key: 'ט"א', value: 'ט"א' },
         { key: 'ביולוגית', value: 'ביולוגית' },
         { key: 'הצתות', value: 'הצתות' },
         { key: 'סימנים וחומרים', value: 'סימנים וחומרים' },
       ],
      }),
      new DatePickerField({
        key: 'sending_date',
        label: 'תאריך שליחה',
        required: false,
        type: 'date',
      }),
      new DatePickerField({
        key: 'receiving_date',
        label: 'תאריך קבלה',
        required: false,
        type: 'date',
      }),
      new TextboxField({
        key: 'packaging',
        label: 'אריזה',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'results',
        label: 'תוצאות',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'notes',
        label: 'הערות',
        required: false,
        type: 'text',
      }),
      new DatePickerField({
        key: 'date',
        label: 'תאריך',
        required: false,
        type: 'date',
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
      new TextboxField({
        key: 'reference',
        label: 'סימוכין',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'investigator_name',
        label: 'שם חוקר',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'phone_num',
        label: 'מספר טלפון',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'bag_num',
        label: 'מספר שקית',
        required: false,
        type: 'text',
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

  getTableColumns(): TableColumn[] {
    return [
      {
        name: 'מס תיק',
        attribute: 'internal_number',
        sortable: true,
      },
      {
        name: 'מס מוצג',
        attribute: 'exhibit_number',
        sortable: true,
      },

      {
        name: 'מס דגימה',
        attribute: 'sample_id',
        sortable: true,
      },
      {
        name: 'מה נדגם',
        attribute: 'what_sampled',
        sortable: true,
      },
      {
        name: 'מאיפה נדגם',
        attribute: 'where_sampled',
        sortable: true,
      },
      {
        name: 'הועבר למעבדה',
        attribute: 'transferred_to_lab',
        sortable: true,
      },
      {
        name: 'תאריך שליחה',
        attribute: 'sending_date',
        sortable: true,
      },
      {
        name: 'תאריך קבלה',
        attribute: 'receiving_date',
        sortable: true,
      },
      {
        name: 'אריזה',
        attribute: 'packaging',
        sortable: true,
      },
      {
        name: 'תוצאות',
        attribute: 'results',
        sortable: true,
      },
      {
        name: 'הערות',
        attribute: 'notes',
        sortable: true,
      },
      {
        name: 'תאריך',
        attribute: 'date',
        sortable: true,
      },
      {
        name: 'שם יחידה',
        attribute: 'unit_name',
        sortable: true,
      },
      {
        name: 'סימוכין',
        attribute: 'reference',
        sortable: true,
      },
      {
        name: 'שם חוקר',
        attribute: 'investigator_name',
        sortable: true,
      },
      {
        name: 'מספר טלפון',
        attribute: 'phone_num',
        sortable: true,
      },
      {
        name: 'מספר שקית',
        attribute: 'bag_num',
        sortable: true,
      },
      {
        name: 'עריכה',
        attribute: 'עריכה',
        sortable: true,
        onClick: (sample: Sample) => {
          console.log(sample);
          // local storage exhibit
          localStorage.setItem("sample",JSON.stringify(sample));
          this.router.navigate(['/editSampleScreen']);
        },
      },
    ];
  }
}
