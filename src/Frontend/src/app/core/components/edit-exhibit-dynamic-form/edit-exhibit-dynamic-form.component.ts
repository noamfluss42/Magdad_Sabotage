import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EditExhibitService } from '../../services/edit-exhibit.service';
import { FieldControlService } from '../../services/field-control.service';
import { RegisterExhibitDataService } from '../../services/register-exhibit-data.service';
import { SharedDataService } from '../../services/shared-data.service';
import { FormFieldBase } from '../../utils/form-field-base';

@Component({
  selector: 'app-edit-exhibit-dynamic-form',
  templateUrl: './edit-exhibit-dynamic-form.component.html',
  styleUrls: ['./edit-exhibit-dynamic-form.component.css'],
  providers: [],
})
export class EditExhibitDynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null = [];
  @Input() exhibitData: any;
  form!: FormGroup;
  payLoad = '';
  constructor(
    private fcs: FieldControlService,
    private service: EditExhibitService
  ) {}

  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
    this.form.controls['bagNumber'].setValue(this.exhibitData.bag_number);
    this.form.controls['bagNumber'].disable();
    this.form.controls['exhibitsMark'].setValue(this.exhibitData.exhibits_mark);
    this.form.controls['exhibitsPackaging'].setValue(
      this.exhibitData.exhibits_packaging
    );
    this.form.controls['internalNumber'].setValue(this.exhibitData.case_id);
    this.form.controls['exhibitDescription'].setValue(
      this.exhibitData.exhibit_description
    );
  }
  onSubmit() {
    this.service.editExhibit(this.form.getRawValue()).subscribe((x) => {
      this.payLoad = x.toString();
    });
  }
}
