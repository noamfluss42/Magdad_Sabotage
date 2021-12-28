import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Constants } from '../constants/constants';
import { OpenCaseFields } from '../models/OpenCasefields';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class OpenCaseDataService {
  openCaseUrl = Constants.API_URL + '/case/';
  constructor(private http: HttpClient) {}
  getCaseFields(): Observable<OpenCaseFields[]> {
    // now returns an Observable of OpenCase
    return this.http.get<OpenCaseFields[]>(this.openCaseUrl);
  }
  /** POST: add a new case to the database */
  postCaseFields(openCaseFields: OpenCaseFields): Observable<OpenCaseFields> {
    // now returns an Observable of OpenCaseFields
    // console.log("Constants.API_URL+'/case/"+JSON.stringify(val));
    return this.http.post<OpenCaseFields>(this.openCaseUrl, openCaseFields, httpOptions);
  }
  /* GET case fields that contains search term */
  searchCaseFields(term: string): Observable<OpenCaseFields[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this.http.get<OpenCaseFields[]>(this.openCaseUrl, options);
  }
  /** DELETE: delete the case from the server */
  deleteCaseField(id: number): Observable<unknown> {
    const url = `${this.openCaseUrl}/${id}`; // DELETE
    return this.http.delete(url, httpOptions);
  }

  /** PUT: update the case field on the server. Returns the updated case upon success. */
  updateCaseField(openCaseFields: OpenCaseFields): Observable<OpenCaseFields> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'my-new-auth-token'
    );

    return this.http.put<OpenCaseFields>(
      this.openCaseUrl,
      openCaseFields,
      httpOptions
    );
  }
}
