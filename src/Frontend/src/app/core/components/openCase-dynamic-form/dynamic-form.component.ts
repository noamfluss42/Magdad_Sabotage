import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { FormFieldBase } from '../../utils/form-field-base';
import { HttpClientModule } from '@angular/common/http';
import { OpenCaseDataService } from '../../services/open-case-data.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FieldControlService,OpenCaseDataService]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormFieldBase<string>[] | null =[];
  form!: FormGroup;
  payLoad = "";



  constructor(private fcs: FieldControlService,private router: Router, private openCaseData: OpenCaseDataService) {};
    ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit(){
    this.openCaseData.postCaseFields(this.form.getRawValue()).subscribe();
    // console.log(this.form.getRawValue());
    //route to next page and add exhibit
    this.router.navigate(['/register-exhibit']);
    // this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
