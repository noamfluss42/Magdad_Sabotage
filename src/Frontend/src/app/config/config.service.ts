import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Constants} from '../core/constants/constants';
import { OpenCaseFields } from '../core/constants/OpenCasefields';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable()
export class ConfigService {

  constructor(private http: HttpClient,
    ) { }
  getConfig():Observable<OpenCaseFields[]> {
    // now returns an Observable of Config
    return this.http.get<OpenCaseFields[]>(Constants.API_URL+'/case/');
  }
  
  postConfig(val:OpenCaseFields):Observable<OpenCaseFields> {
    // now returns an Observable of Config
    // console.log("Constants.API_URL+'/case/"+JSON.stringify(val));
    return this.http.post<OpenCaseFields>(Constants.API_URL+'/case/',val,httpOptions);
  }
}
