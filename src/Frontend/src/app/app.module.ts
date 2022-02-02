import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormFieldComponent } from './core/components/dynamic-form-field/dynamic-form-field.component';
import { GenLabDynamicFormComponent } from './core/components/gen-lab-dynamic-form/gen-lab-dynamic-form.component';
import { DynamicFormComponent } from './core/components/openCase-dynamic-form/dynamic-form.component';
import { RegisterExhibitDynamicFormComponent } from './core/components/register-exhibit-dynamic-form/register-exhibit-dynamic-form.component';
import { GenLabFormFieldsService } from './core/services/gen-lab-form-fields.service';
import { OpenCaseFieldsService } from './core/services/open-case-fields.service';
import { RegisterExhibitFieldsService } from './core/services/register-exhibit-fields.service';
import { SharedDataService } from './core/services/shared-data.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent,
    RegisterExhibitDynamicFormComponent,
    routingComponents,
    GenLabDynamicFormComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    OpenCaseFieldsService,
    RegisterExhibitFieldsService,
    GenLabFormFieldsService,
    SharedDataService,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
})
export class AppModule {
  constructor() {}
}
