import { Component, Inject, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { ExhibitsService } from 'src/app/core/services/exhibits.service';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from 'src/app/core/services/field-control.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    private fcs: FieldControlService // public dialog: MatDialog, // public dialogRef: MatDialogRef<EditExhibitScreenComponent>, // @Inject(MAT_DIALOG_DATA) public dataDialog:any,
  ) {
    this.fields$ = service.getQuestions();
    this.field$ = this.fields$[1];
    this.form = this.fcs.toFormGroup([this.field$]);

  }

  ngOnInit(): void {

  }

  // // This function will run once the bag_number is submitted, then the forms will change
  // // this can be seen in the html template.s
  // onSubmit(): void {
  //   // this.service.getExhibit(this.form.getRawValue().bag_number).subscribe((res: any) => {
  //     this.service.editExhibit(this.form.getRawValue()).subscribe((res: any) => {
  //       console.log(res);
  //     }
  //     );

  //   // var exhibit : string = JSON.parse(localStorage.getItem('exhibit')).exhibit_number;
  //   // this.service.getExhibit().subscribe((x: any) => (this.data = x));
  // }



  // Will be called after child form initializes, will fill the form with data
  // That have been returned from the server.
  onFieldsInit = (form: FormGroup): void => {
    this.data = JSON.parse(localStorage.getItem('exhibit') || '{}');
    // form.controls['exhibit_number'].setValue(this.data.exhibit_number);
    // go over this.data and set the value of the form

    // go ovewr JSON object and set the value of the form
    for (let key in this.data) {
      if (form.controls[key]) {
        form.controls[key].setValue(this.data[key]);
      }
    }
  };

  // // Will be called after child form submitted
  // // Function must be defined as arrow function otherwise 'this' keyword will refer to
  // // DynamicFormComponent insted of this(RegisterExhibitScreenComponent) component.
  // onChildSubmit = (form: FormGroup, cb: (res: string) => void): void => {
  //   this.service.editExhibit(form.getRawValue()).subscribe((res: any) => {
  //     cb(res);
  //   });
  // };
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  onEditSubmit= (form: FormGroup): void => {
    const formRawValue = form.getRawValue();
    delete formRawValue.sample_navigation;
    this.service.editExhibit(formRawValue).subscribe((res: any) => {
      console.log(res);
    }
    );
  }

}
