import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadExhibitsService {

  constructor(private http: HttpClient) { }

  // Sends GET request to backend for downloading exhibits.
  downloadExhibits() {
    this.http
      .request('GET', `${Constants.API_URL}/exhibits/dwnld/`, {
        responseType: 'blob',
      })
      .subscribe((data: any) => {
        saveAs(data, 'exhibits.xlsx'); //TODO Fix file extension
      });
  }

}
