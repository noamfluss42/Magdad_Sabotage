import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { FormFieldBase } from '../../utils/form-field-base';
import { OpenCaseDataService } from '../../services/open-case-data.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-OpenCase-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FieldControlService, OpenCaseDataService],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(
    private fcs: FieldControlService,
    private router: Router,
    private openCaseData: OpenCaseDataService,
    private sharedData: SharedDataService,
    private fb: FormBuilder,
  ) {
      this.form = this.fb.group({
        fields: this.fields
      });

  }
  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit() {
    // this.openCaseData.postCaseFields(this.form.getRawValue()).subscribe();
    this.sharedData.addToData(this.form.getRawValue());
    // console.log(this.form.getRawValue());
    //route to next page and add exhibit
    this.router.navigate(['/registerExhibit']);
    // this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
