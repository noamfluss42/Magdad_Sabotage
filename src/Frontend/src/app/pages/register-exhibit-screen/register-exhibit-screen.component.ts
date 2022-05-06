import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExhibitsService } from 'src/app/core/services/exhibits.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { FormFieldBase } from '../../core/utils/form-field-base';

@Component({
  selector: 'app-register-exhibit-screen',
  templateUrl: './register-exhibit-screen.component.html',
  styleUrls: ['./register-exhibit-screen.component.css'],
})
export class RegisterExhibitScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];

  constructor(
    private service: ExhibitsService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.fields$ = this.service.getQuestions();

    //var values = Array.from(this.fields$.values())
    //values[values.length - 1]["onClick"] = this.a

  }

  ngOnInit(): void {}

  // Function must be defined as arrow function otherwise 'this' keyword will refer to
  // DynamicFormComponent insted of this(RegisterExhibitScreenComponent) component.
  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();
    this.service.postExhibit(formRawValue).subscribe((res: any) => {
      cb(res);
    });
    this.sharedData.addToData(formRawValue);
    this.router.navigate(['/genLabForm']);
  };

}
