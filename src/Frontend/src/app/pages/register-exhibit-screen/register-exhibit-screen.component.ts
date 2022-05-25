import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExhibitsService } from 'src/app/core/services/exhibits.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { SamplesService } from 'src/app/core/services/samples.service';
import { FormFieldBase } from '../../core/utils/form-field-base';

enum Mode { Exhibits, RegisterSamples, EditSamples }

@Component({
  selector: 'app-register-exhibit-screen',
  templateUrl: './register-exhibit-screen.component.html',
  styleUrls: ['./register-exhibit-screen.component.css'],
})
export class RegisterExhibitScreenComponent implements OnInit {
  fields$: FormFieldBase<any>[];
  samplesFields$: FormFieldBase<any>[];

  mode$: Mode;

  constructor(
    private service: ExhibitsService,
    private sharedData: SharedDataService,
    private samplesService: SamplesService,
    private router: Router
  ) {
    this.fields$ = this.service.getQuestions();
    this.samplesFields$ = this.samplesService.getQuestions();
    this.mode$ = Mode.Exhibits

    //var values = Array.from(this.fields$.values())
    //values[values.length - 1]["onClick"] = this.a

  }

  ngOnInit(): void {}

  // Function must be defined as arrow function otherwise 'this' keyword will refer to
  // DynamicFormComponent insted of this(RegisterExhibitScreenComponent) component.
  onSubmit = (form: FormGroup, cb: (res: string) => void): void => {
    var does_exist = false;
    const formRawValue = form.getRawValue();
    delete formRawValue.sample_navigation;
    this.service.getExhibitsFromCase(formRawValue).subscribe((res: any) => {
      //check if case exist
      if(res.length > 0){
        does_exist = true;
      }
      if(does_exist){
        //update case
        this.service.editExhibit(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      }else{
        //create case
        this.service.postExhibit(formRawValue).subscribe((res: any) => {
          cb(res);
        });
      }
    });
    this.sharedData.addToData(formRawValue);
    // this.router.navigate(['/genLabForm']);
  };

  openNewSample() {
    this.mode$ = Mode.RegisterSamples
  }

  registerNewSample() {
    this.mode$ = Mode.Exhibits
  }

}
