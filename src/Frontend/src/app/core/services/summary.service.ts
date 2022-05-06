import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Constants } from '../constants/constants';
import { TextboxField, ButtonField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {

  monthlySummaryURL = `${Constants.API_URL}/monthlySummary`;
  yearlySummaryURL = `${Constants.API_URL}/yearlySummary`;

  constructor(private http: HttpClient) { }

  /* GET: gets monthly summary from the server */
  getMonthlySummary(range: string) {
    return this.http.get(`${this.monthlySummaryURL}/${range}`, {
      responseType: 'json',
    });
  }

  /* GET: gets yearly summary from the server */
  getYearlySummary(currentDate: string) {
    return this.http.get(`${this.yearlySummaryURL}/${currentDate}`, {
      responseType: 'json',
    });
  }

  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new ButtonField({
        key: 'test',
        label: 'ינואר',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'פברואר',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'מרץ',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'אפריל',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'מאי',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'יוני',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'יולי',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'אוגוסט',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'ספטמבר',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'אוקטובר',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'נובמבר',
        required: true,
        type: 'button',
      }),
      new ButtonField({
        key: 'test',
        label: 'דצמבר',
        required: true,
        type: 'button',
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }

}
