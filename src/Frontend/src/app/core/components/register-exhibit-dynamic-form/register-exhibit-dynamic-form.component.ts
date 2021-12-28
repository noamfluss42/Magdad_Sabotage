import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { RegisterExhibitDataService } from '../../services/register-exhibit-data.service';
import { FormFieldBase } from '../../utils/form-field-base';

@Component({
  selector: 'app-register-exhibit-dynamic-form',
  templateUrl: './register-exhibit-dynamic-form.component.html',
  styleUrls: ['./register-exhibit-dynamic-form.component.css']
})
export class RegisterExhibitDynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null =[];
  form!: FormGroup;
  payLoad = "";
  constructor(private fcs: FieldControlService,private red:RegisterExhibitDataService ) { }

  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit(){

  this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
