import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { RegisterExhibitFieldsService } from 'src/app/core/services/register-exhibit-fields.service';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from 'src/app/core/services/field-control.service';
import { EditExhibitService } from 'src/app/core/services/edit-exhibit.service';

@Component({
  selector: 'app-edit-exhibit-screen',
  templateUrl: './edit-exhibit-screen.component.html',
  styleUrls: ['./edit-exhibit-screen.component.css'],
})
export class EditExhibitScreenComponent implements OnInit {
  fields$: Observable<FormFieldBase<any>[]>;
  field$: FormFieldBase<string> = new FormFieldBase<string>();
  data: any;
  form!: FormGroup;
  constructor(
    service: RegisterExhibitFieldsService,
    private fcs: FieldControlService,
    private httpService: EditExhibitService
  ) {
    this.fields$ = service.getQuestions();
    service
      .getQuestions()
      .pipe(first())
      .subscribe((x) => {
        this.field$ = x[1];
        this.form = this.fcs.toFormGroup([this.field$]);
      });
    console.log(this.field$);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.form.getRawValue()?.bagNumber) return;
    this.httpService
      .getExhibit(this.form.getRawValue().bagNumber)
      .subscribe((x: any) => (this.data = x));
  }
}
