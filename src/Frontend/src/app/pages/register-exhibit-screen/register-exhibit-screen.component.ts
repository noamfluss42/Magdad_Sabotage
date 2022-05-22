import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExhibitsService } from 'src/app/core/services/exhibits.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { SamplesService } from 'src/app/core/services/samples.service';
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

    const localCase = JSON.parse(localStorage.getItem('case') || '[]');
    var values = Array.from(this.fields$.values())
    values[0]["value"] = localCase.internal_number
    values[11]["value"] = localCase.sender_name

  }

  ngOnInit(): void {}

  // Function must be defined as arrow function otherwise 'this' keyword will refer to
  // DynamicFormComponent insted of this(RegisterExhibitScreenComponent) component.
  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const formRawValue = form.getRawValue();
    delete formRawValue.sample_navigation;
    this.service.postExhibit(formRawValue).subscribe((res: any) => {
      cb(res);
    });

    localStorage.setItem('exhibit', JSON.stringify(formRawValue));

    this.sharedData.addToData(formRawValue);
    // this.router.navigate(['/genLabForm']);
  };

}
