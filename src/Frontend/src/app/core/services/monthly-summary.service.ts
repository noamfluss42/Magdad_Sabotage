import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Constants } from '../constants/constants';
import { TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';

@Injectable({
  providedIn: 'root',
})
export class MonthlySummaryService {
  monthlySummaryURL = `${Constants.API_URL}/monthlySummary`;

  constructor(private http: HttpClient) { }

  /* GET: gets monthly summary from the server */
  getMonthlySummary(range: string) {
    return this.http.get(`${this.monthlySummaryURL}/${range}`, {
      responseType: 'json',
    });
  }
}

