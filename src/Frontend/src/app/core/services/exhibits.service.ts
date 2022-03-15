import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Constants } from '../constants/constants';
import { TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import { Exhibit } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ExhibitsService {
  exhibitsURL = `${Constants.API_URL}/exhibits`;

  constructor(private http: HttpClient) {}

  getExhibit(bag_number: string) {
    return this.http.get(`${this.exhibitsURL}/${bag_number}`, {
      responseType: 'json',
    });
  }

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

  postExhibit(exhibit: Exhibit) {
    return this.http.post<any>(`${Constants.API_URL}/exhibits`, exhibit, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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
}
