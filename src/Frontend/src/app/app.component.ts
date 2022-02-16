import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenCaseFieldsService } from './core/services/open-case-fields.service';
import { FormFieldBase } from './core/utils/form-field-base';
import { EditExhibitScreenComponent } from './pages/edit-exhibit-screen/edit-exhibit-screen.component';
import { OpenCaseScreenComponent } from './pages/open-case-screen/open-case-screen.component';
import { RegisterExhibitScreenComponent } from './pages/register-exhibit-screen/register-exhibit-screen.component';

@Component({
  selector: 'app-root',
  // providers: [OpenCaseFieldsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    OpenCaseScreenComponent,
    RegisterExhibitScreenComponent,
    EditExhibitScreenComponent,
  ],
})
export class AppComponent {
  constructor() {}
}
