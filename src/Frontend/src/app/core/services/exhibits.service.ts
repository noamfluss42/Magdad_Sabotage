import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import { Exhibit, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ExhibitsService {
  exhibitsURL = `${Constants.API_URL}/exhibits`;

  constructor(private http: HttpClient) {}

  /* GET: get exhibit by bag_number from the server */
  getExhibit(bag_number: string) {
    console.log(bag_number);
    return this.http.get(`${this.exhibitsURL}/${bag_number}`, {
      responseType: 'json',
    });
  }

  /* PUT: edit exhibit by bag_number on the server */
  editExhibit(exhibit: Exhibit) {
    return this.http.put<any>(
      `${this.exhibitsURL}/${exhibit.bag_number}`,
      exhibit,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    );
  }

  /* POST: add new exhibit to the server */
  postExhibit(exhibit: Exhibit) {
    return this.http.post<any>(`${Constants.API_URL}/exhibits`, exhibit, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    });
  }

  getExhibitsFromCase(case_id: string) {
    // should later be replaced from a response from a server
    return [
      {
        index:1,
        internal_number: '1/22',
        mark: '2',
        storage_location: '1',
        description: 'רימון',
        quantity: '1',
        destination: 'השמדה',
        hanap: 'V',
        hanap_weight: '156 גרם',
        entry_date: '1.1.22',
        treatment_date: '1.3.22',
        investigator_name: 'עומר',
        lab_name: 'דרום',
      },
      {
        index:2,
        internal_number: '1/22',
        mark: '3',
        storage_location: '5',
        description: 'כפפה',
        quantity: '2',
        destination: 'השוואה',
        entry_date: '1.1.22',
        treatment_date: '2.2.22',
        investigator_name: 'עומר',
        lab_type: 'ביולגית',
        test_results: 'אותר די אן איי תואם',
        lab_name: 'דרום',
      },
      {
        index:3,
        internal_number: '1/22',
        mark: '4',
        storage_location: '6',
        description: 'טל"ס',
        quantity: '1',
        destination: 'אחסנה',
        entry_date: '1.1.22',
        investigator_name: 'עומר',
        lab_type: 'חבלה',
        lab_name: 'דרום',
      },
    ];
  }

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'case_id', // +year
        label: 'מספר תיק',
        required: true,
        type: 'text',
        // value:OpenCaseFieldsService.getQuestions().key['internalNumber'], //! impleament method to get case id from open case service to exhibit register.
      }),
      new TextboxField({
        key: 'bag_number', // +year
        label: '  מספר שקית',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'exhibit_description', // +year
        label: 'תיאור המוצג',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'exhibit_packaging',
        label: 'אריזה',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'exhibit_mark',
        label: 'סימון',
        required: true,
        type: 'text',
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

  // return the columns that will be displayed in the dynamic table
  // name --> what will be displayed in the table
  // attribute --> the attribute of exhibit that will be returned.
  // sortable --> if the column is sortable ( for now doesn't work, might be replaced later with sort function)
  // TODO: add sort when I come back from Italy
  getTableColumns(): TableColumn[] {
    return [
      {
        name: 'מספר ',
        // setting attribute to index to get the index of the exhibit in the array
        attribute: 'index',
        sortable: true,
        // set value to index
      },
      {
        name: "מס' פנימי",
        attribute: 'internal_number',
        sortable: true,
      },
      {
        name: "מס' מוצג",
        attribute: 'mark',
        sortable: true,
      },
      {
        name: 'מיקום אחסנה',
        attribute: 'storage_location',
        sortable: true,
      },
      {
        name: 'תיאור',
        attribute: 'description',
        sortable: true,
      },
      {
        name: 'כמות',
        attribute: 'quantity',
        sortable: true,
      },
      {
        name: 'ייעוד',
        attribute: 'destination',
        sortable: true,
      },
      {
        name: 'חנ"פ',
        attribute: 'hanap',
        sortable: true,
      },
      {
        name: 'משקל חנ"פ',
        attribute: 'hanap_weight',
        sortable: true,
      },
      {
        name: 'תארךיך הכנסה',
        attribute: 'entry_date',
        sortable: true,
      },
      {
        name: 'תאריך טיפול',
        attribute: 'treatment_date',
        sortable: true,
      },
      {
        name: 'שם חוקר',
        attribute: 'investigator_name',
        sortable: true,
      },
      {
        name: 'מעבדה',
        attribute: 'lab_type',
        sortable: true,
      },
      {
        name: 'תוצאות בדיקה',
        attribute: 'test_results',
        sortable: true,
      },
      {
        name: 'מעבדה חוקרת',
        attribute: 'lab_name',
        sortable: true,
      },
    ].reverse();
  }
}
