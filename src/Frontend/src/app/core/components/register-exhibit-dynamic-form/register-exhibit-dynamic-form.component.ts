import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldControlService } from '../../services/field-control.service';
import { RegisterExhibitDataService } from '../../services/register-exhibit-data.service';
import { SharedDataService } from '../../services/shared-data.service';
import { FormFieldBase } from '../../utils/form-field-base';

@Component({
  selector: 'app-register-exhibit-dynamic-form',
  templateUrl: './register-exhibit-dynamic-form.component.html',
  styleUrls: ['./register-exhibit-dynamic-form.component.css'],
  providers: [],
})
export class RegisterExhibitDynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  constructor(
    private fcs: FieldControlService,
    private red: RegisterExhibitDataService,
    private sharedData: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit() {
    const formRawValue = this.form.getRawValue();
    this.sharedData.addToData(formRawValue);
    this.payLoad = JSON.stringify(formRawValue);
    this.router.navigate(['/genLabForm']);
  }
}
