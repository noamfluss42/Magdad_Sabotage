import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { GenLabFormDataService } from '../../services/gen-lab-form-data.service';
import { SharedDataService } from '../../services/shared-data.service';
import { FormFieldBase } from '../../utils/form-field-base';

@Component({
  selector: 'app-gen-lab-dynamic-form',
  templateUrl: './gen-lab-dynamic-form.component.html',
  styleUrls: ['./gen-lab-dynamic-form.component.css'],
  providers: [],
})
export class GenLabDynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  constructor(
    private fcs: FieldControlService,
    private glfb: GenLabFormDataService,
    private sharedData: SharedDataService
  ) {}

  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit() {
    this.sharedData.addToData(this.form.getRawValue());
    this.sharedData.prepareForDocx();
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
