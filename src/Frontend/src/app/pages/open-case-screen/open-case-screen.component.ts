import { Component, OnInit } from '@angular/core';
import { FormFieldBase } from '../../core/utils/form-field-base';
import { CasesService } from 'src/app/core/services/cases.service';
import { FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';
import { SearchCaseService } from 'src/app/core/services/search-case.service';
@Component({
  selector: 'app-open-case-screen',
  templateUrl: './open-case-screen.component.html',
  styleUrls: ['./open-case-screen.component.css'],
})
export class OpenCaseScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  tags$ : FormFieldBase<any>[];


  constructor(
    private service: CasesService,
    private searchService: SearchCaseService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
    this.tags$ = service.getTags();

  }

  ngOnInit(): void { }

  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    const savedCase =JSON.parse(localStorage.getItem('case') || '[]');
    // merge from.getRawValue data with tags
    const data = {...savedCase, ...form.getRawValue()};
    console.log(data);
    this.service.postCase(data).subscribe((res: any) => {
      cb(res);
    });
    this.sharedData.addToData(data);
  };

  onSave = (form: FormGroup, cb: (res: string) => void): void => {
    // sort form value by interface keys
    var does_exist = false;
    const formRawValue = form.getRawValue();
    delete formRawValue.navigator;
    //check first press
    //get case from service
    this.searchService.postQuery(formRawValue).subscribe((res: any) => {
      //check if case exist
      if(res.length > 0){
        does_exist = true;
      }
      if(does_exist){
        //update case
        this.service.updateCase(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      }else{
        //create case
        this.service.postCase(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      }
    });
}
}