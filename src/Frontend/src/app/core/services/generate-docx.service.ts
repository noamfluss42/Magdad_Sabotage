import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class GenerateDocxService {
  constructor(private http: HttpClient) {}

  // send the documents parameters to the server and retrive a file.
  downloadDocx(docxData: any) {
    this.http
      .request('GET', `${Constants.API_URL}/img`, {
        responseType: 'blob',
        params: docxData,
      })
      .subscribe((data: any) => {
        saveAs(data, 'report.docx');
      });
  }
}
