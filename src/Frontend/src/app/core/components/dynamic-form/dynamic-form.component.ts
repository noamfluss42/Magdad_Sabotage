import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { FormFieldBase } from '../../utils/form-field-base';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from 'src/app/config/config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FieldControlService,ConfigService]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null =[];
  form!: FormGroup;
  payLoad = "";



  constructor(private fcs: FieldControlService, private cs: ConfigService) {};
    ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit(){ 
    this.cs.postConfig(this.form.getRawValue()).subscribe();
    console.log(this.form.getRawValue());
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
