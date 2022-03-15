import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { ExhibitsService } from 'src/app/core/services/exhibits.service';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from 'src/app/core/services/field-control.service';

@Component({
  selector: 'app-edit-exhibit-screen',
  templateUrl: './edit-exhibit-screen.component.html',
  styleUrls: ['./edit-exhibit-screen.component.css'],
})
export class EditExhibitScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  field$: FormFieldBase<string> = new FormFieldBase<string>();
  data: any;
  form!: FormGroup;
  constructor(
    private service: ExhibitsService,
    private fcs: FieldControlService
  ) {
    this.fields$ = service.getQuestions();
    this.field$ = this.fields$[1];
    this.form = this.fcs.toFormGroup([this.field$]);
  }

  ngOnInit(): void {}

  // This function will run once the bag_number is submitted, then the forms will change
  // this can be seen in the html template.s
  onSubmit(): void {
    if (!this.form.getRawValue()?.bag_number) return;
    this.service
      .getExhibit(this.form.getRawValue().bagNumber)
      .subscribe((x: any) => (this.data = x));
  }

  // Will be called after child form initializes, will fill the form with data
  // That have been returned from the server.
  onFieldsInit = (form: FormGroup): void => {
    form.controls['bag_number'].setValue(this.data.bag_number);
    form.controls['bag_number'].disable();
    form.controls['exhibit_mark'].setValue(this.data.exhibit_mark);
    form.controls['exhibit_packaging'].setValue(this.data.exhibit_packaging);
    form.controls['case_id'].setValue(this.data.case_id);
    form.controls['exhibit_description'].setValue(
      this.data.exhibit_description
    );
  };

  // Will be called after child form submitted
  // Function must be defined as arrow function otherwise 'this' keyword will refer to
  // DynamicFormComponent insted of this(RegisterExhibitScreenComponent) component.
  onChildSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    this.service.editExhibit(form.getRawValue()).subscribe((res: any) => {
      cb(res);
    });
  };
}
