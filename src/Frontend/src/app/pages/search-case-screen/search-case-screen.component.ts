import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCaseService } from 'src/app/core/services/search-case.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { FormFieldBase } from 'src/app/core/utils/form-field-base';

@Component({
  selector: 'app-search-case-screen',
  templateUrl: './search-case-screen.component.html',
  styleUrls: ['./search-case-screen.component.css']
})
export class SearchCaseScreenComponent implements OnInit {

  fields$: FormFieldBase<any>[];
  tags$: FormFieldBase<any>[];

  constructor(
    private service: SearchCaseService,
    private router: Router
  ) {
    this.fields$ = service.getQuestions();
    this.tags$ = service.getTags();
   }

  ngOnInit(): void {
  }
  //posts data to the server and gets back a list of json objects with the cases. save them and navigate to the search-case-result-screen and pass the data to it
  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    this.service.postQuery(form.value).subscribe(
      (res: any) => {

        this.service.setData(res);
        console.log(res);
        this.router.navigate(['/searchCaseResult']);
      }
    );

  }
}
