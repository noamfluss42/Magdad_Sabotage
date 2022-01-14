import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { RegisterExhibitFieldsService } from 'src/app/core/services/register-exhibit-fields.service';
@Component({
  selector: 'app-register-exhibit-screen',
  templateUrl: './register-exhibit-screen.component.html',
  styleUrls: ['./register-exhibit-screen.component.css']
})
export class RegisterExhibitScreenComponent implements OnInit {
  fields$: Observable<FormFieldBase<any>[]>;

  constructor(service:RegisterExhibitFieldsService) {
    this.fields$ = service.getQuestions();
  }

  ngOnInit(): void {

  }

}
