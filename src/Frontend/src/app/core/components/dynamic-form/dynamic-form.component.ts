import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { FormFieldBase } from '../../utils/form-field-base';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from 'src/app/config/config.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FieldControlService],
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FormFieldBase<string>[] | null =[];
  form!: FormGroup;
  payLoad = "";



  constructor(private fcs: FieldControlService,private cs:ConfigService) { }

  ngOnInit(): void {
    this.form = this.fcs.toFormGroup(this.fields as FormFieldBase<string>[]);
  }
  onSubmit() {
      this.cs.postConfig(this.form.getRawValue());
  //   this.http.post<any>('https://reqres.in/api/posts', this.form.getRawValue).subscribe((data: { id: any; }) => {
  //     // this.postId = data.id;
  // })
    
    this.payLoad = JSON.stringify(this.form.getRawValue());


    
  }

}
