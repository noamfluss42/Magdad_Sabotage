import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import type { FormFieldBase } from '../../utils/form-field-base';
import { Component, OnInit } from '@angular/core';
import { FieldControlService } from '../../services/field-control.service';
import { SharedDataService } from '../../services/shared-data.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  //the fields of the form used to create the form.
  @Input() fields: FormFieldBase<string>[] | null = [];
  @Input() buttonText: string = '';

  // input from parent component, and is called after form submitation.
  @Input() onSubmit: (form: FormGroup, cb: (res: string) => void) => void =
    () => {};
  // optional input from parent component, to be called after form is initialized
  @Input() onInit?: (form: FormGroup) => void;
  form!: FormGroup;
  payLoad = '';
  public buttonStatus = true;

  constructor(private fcs: FieldControlService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fields: this.fields,
    });
  }

  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
    if (this.onInit) {
      this.onInit(this.form);
    }
  }

  // a call back function that will be called after parent onSubmit finished running.
  onSubmitCallBack: (res: string) => void = (res: string) => {
    this.payLoad = res;
    
    // go over all the fields and check for button type
    // change getButtonStatus to false to enable the button
  };

  //function to reset the form.
  onReset() {
    this.form.reset();
  }

  //function to check if all required fields are filled.
  isValid(): boolean {

    return this.form.valid;
  }

  enableButton() {
    this.buttonStatus = false;
  }
  //buttonstatus getter


}
