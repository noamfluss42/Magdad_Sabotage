import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { ButtonField, TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import { Exhibit, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ExhibitsService {
  exhibitsURL = `${Constants.API_URL}/exhibits`;

  constructor(private http: HttpClient, private router: Router) {}

  /* GET: get exhibit by bag_number from the server */
  getExhibit(exhibit_number: string) {
    console.log(exhibit_number);
    return this.http.get(`${this.exhibitsURL}/${exhibit_number}`, {
      responseType: 'json',
    });
  }

  /* PUT: edit exhibit by bag_number on the server */
  editExhibit(exhibit: Exhibit) {
    return this.http.put<any>(
      `${this.exhibitsURL}/${exhibit.exhibit_number}`,
      exhibit,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    );
  }

  /* POST: add new exhibit to the server */
  postExhibit(exhibit: Exhibit) {
    console.log(exhibit);
    return this.http.post<any>(`${Constants.API_URL}/exhibits`, exhibit, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    });
  }

  // getCaseExhibits(case_id: string) {
  //   return this.http.get<any>(`${this.exhibitsURL}/query/{exhibit_number}`, {
  //     responseType: 'json',
  //   });
  // }

  getExhibitsFromCase(case_internal_number: string) {
    return this.http.get<Exhibit>(`${this.exhibitsURL}/query/${case_internal_number}`, {
      responseType: 'json',
    });
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
        key: 'exhibit_number', // +year
        label: "מס' מוצג",
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'location',
        label: 'מיקום',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'description', // +year
        label: 'תיאור המוצג',
        required: true,
        type: 'text',
      }),

      new TextboxField({
        key: 'amount',
        label: 'כמות',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'destination',
        label: 'ייעוד',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key:'explosive',
        label:'חנ"פ',
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:'explosive_weight',
        label:'משקל חנ"פ',
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:"tnt_equivalent",
        label:"TNT אקוויולנט ל ",
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:"received_date",
        label:"תאריך הכנסה",
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:"handled_date",
        label:"תאריך טיפול",
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:"investigator_name",
        label:"שם חוקר",
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:"lab_name",
        label:"מעבדה",
        required:true,
        type:'text',
      }),
      new TextboxField({
        key:"result",
        label:"תוצאות בדיקה",
        required:true,
        type:'text',
      }),




      new ButtonField({
        key: 'test',
        label: 'תנועת דגימות',
        required: true,
        type: 'button',
      }),
    ];
    return questions;
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
        attribute: 'exhibit_number',
        sortable: true,
      },
      {
        name: 'מיקום אחסנה',
        attribute: 'location',
        sortable: true,
      },
      {
        name: 'תיאור',
        attribute: 'description',
        sortable: true,
      },
      {
        name: 'כמות',
        attribute: 'amount',
        sortable: true,
      },
      {
        name: 'ייעוד',
        attribute: 'destination',
        sortable: true,
      },
      {
        name: 'חנ"פ',
        attribute: 'explosive',
        sortable: true,
      },
      {
        name: 'משקל חנ"פ',
        attribute: 'explosive_weight',
        sortable: true,
      },
      {
        name: 'TNTאקווילנט ל',
        attribute: 'tnt_equivalent',
        sortable: true,
      },
      {
        name: 'תארךיך הכנסה',
        attribute: 'received_date',
        sortable: true,
      },
      {
        name: 'תאריך טיפול',
        attribute: 'handled_date',
        sortable: true,
      },
      {
        name: 'שם חוקר',
        attribute: 'investigator_name',
        sortable: true,
      },
      {
        name: 'מעבדה חוקרת',
        attribute: 'lab_name',
        sortable: true,
      },
      {
        name: 'תוצאות בדיקה',
        attribute: 'results',
        sortable: true,
      },
      {
        name: 'עריכה',
        attribute: 'עריכה',
        sortable: true,
        onClick: (exhibit: Exhibit) => {
          this.getExhibit(exhibit.exhibit_number); //TODO implement edit exhibit
        },
      },

    ];
  }
}
