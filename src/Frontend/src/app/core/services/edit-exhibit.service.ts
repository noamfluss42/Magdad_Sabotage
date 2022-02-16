import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class EditExhibitService {
  constructor(private http: HttpClient) {}

  getExhibit(bagNumber: string) {
    return this.http.get(`${Constants.API_URL}/exhibit/${bagNumber}`, {
      responseType: 'json',
    });
  }

  editExhibit(data: any) {
    const body = {
      bag_number: data.bagNumber,
      case_id: data.caseId,
      exhibit_description: data.exhibitDescription,
      exhibits_packaging: data.exhibitsPackaging,
      exhibits_mark: data.exhibitsMark,
    };
    return this.http.put<any>(
      `${Constants.API_URL}/exhibit/${data.bagNumber}`,
      body,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    );
  }
}
