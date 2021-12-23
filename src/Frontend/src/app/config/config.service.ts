import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Constants} from '../core/constants/constants';
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
  getConfig(val:any) {
    // now returns an Observable of Config
    return this.http.get(Constants.API_URL+'/case/',val);
  }
  
  postConfig(val:any) {
    // now returns an Observable of Config
    return this.http.post(Constants.API_URL+'/case/',val);
  }
}
