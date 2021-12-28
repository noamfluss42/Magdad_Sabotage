import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { OpenCaseFieldsService } from '../../core/services/open-case-fields.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-open-case-screen',
  templateUrl: './open-case-screen.component.html',
  styleUrls: ['./open-case-screen.component.css']
})
export class OpenCaseScreenComponent implements OnInit {
  fields$: Observable<FormFieldBase<any>[]>;

  constructor(service: OpenCaseFieldsService) {
    this.fields$ = service.getQuestions();
  }
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.fields$ = params['fields'];
    // });
  }

}
