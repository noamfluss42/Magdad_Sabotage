import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { OpenCaseFieldsService } from '../../core/services/open-case-fields.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-gen-lab-form-screen',
  templateUrl: './gen-lab-form-screen.component.html',
  styleUrls: ['./gen-lab-form-screen.component.css']
})
export class GenLabFormScreenComponent implements OnInit {
  fields$: Observable<FormFieldBase<any>[]>;
  constructor(service: OpenCaseFieldsService) {
    this.fields$ = service.getQuestions();
  }

  ngOnInit(): void {
  }

}
