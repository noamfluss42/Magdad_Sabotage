import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class GenerateDocxService {
  constructor(private http: HttpClient) {}

  downloadDocx(docxData: any) {
    this.http
      .request('GET', `http://localhost:8000/img`, {
        responseType: 'blob',
        params: docxData,
      })
      .subscribe((data: any) => {
        saveAs(data, 'report.docx');
      });
    // this.http
    //   .get(`http://localhost:8000/img`, {
    //     params: docxData,
    //     headers: {
    //       responseType: 'blob',
    //     },
    //   })
    //   .subscribe((data: Blob) => {
    //     console.log(data);
    //   });
  }
}
