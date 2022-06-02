import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SamplesService } from 'src/app/core/services/samples.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { FormFieldBase } from '../../core/utils/form-field-base';

@Component({
  selector: 'app-samples-screen',
  templateUrl: './samples-screen.component.html',
  styleUrls: ['./samples-screen.component.css'],
})
export class SamplesScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];

  constructor(private service: SamplesService) {
    this.fields$ = this.service.getQuestions();

    // Gets exhibit's data from local storage
    const localExhibit = JSON.parse(localStorage.getItem('exhibit') || '[]');
    // Convert all fields into array and auto fills some fields with values from exhibit.
    var values = Array.from(this.fields$.values())
    values[0]["value"] = localExhibit.internal_number
    values[1]["value"] = localExhibit.exhibit_number
    values[11]["value"] = localExhibit.lab_name
    values[13]["value"] = localExhibit.investigator_name

  }

  ngOnInit(): void {}

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {

    const formRawValue = form.getRawValue();
    alert("postSample"+formRawValue.exhibit_number)
    this.service.postSample(formRawValue).subscribe((res: any) => {
      console.log(res);
      alert(' דגימה' + res + 'נפתחה בהצלחה ');
      localStorage.setItem("sample",JSON.stringify(formRawValue));
    }
    );

  };
}
