import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DynamicFormFieldComponent } from './core/components/dynamic-form-field/dynamic-form-field.component';
import { DynamicFormComponent } from './core/components/openCase-dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import {MatGridListModule} from '@angular/material/grid-list';
import { RegisterExhibitDynamicFormComponent } from './core/components/register-exhibit-dynamic-form/register-exhibit-dynamic-form.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { GenLabDynamicFormComponent } from './core/components/gen-lab-dynamic-form/gen-lab-dynamic-form.component';
import { OpenCaseFieldsService } from './core/services/open-case-fields.service';
import { RegisterExhibitFieldsService } from './core/services/register-exhibit-fields.service';
import { GenLabFormFieldsService } from './core/services/gen-lab-form-fields.service';
import { MatCheckboxModule } from '@angular/Material/checkbox'
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
    MatCheckboxModule
    
  ],

  declarations: [AppComponent, DynamicFormComponent, DynamicFormFieldComponent,RegisterExhibitDynamicFormComponent, routingComponents, GenLabDynamicFormComponent],
  bootstrap: [AppComponent],
  providers: [OpenCaseFieldsService,RegisterExhibitFieldsService,GenLabFormFieldsService],
})
export class AppModule {
  constructor() {}
}
