import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenCaseFieldsService } from './core/services/open-case-fields.service';
import { FormFieldBase } from './core/utils/form-field-base';
@Component({
  selector: 'app-root',
  template: ` <div>
    <app-dynamic-form [fields]="fields$ | async"></app-dynamic-form>
  </div>`,
  providers: [OpenCaseFieldsService],
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  fields$: Observable<FormFieldBase<any>[]>;

  constructor(service: OpenCaseFieldsService) {
    this.fields$ = service.getQuestions();
  }
}
