import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DynamicFormFieldComponent } from './core/components/dynamic-form-field/dynamic-form-field.component';
import { DynamicFormComponent } from './core/components/dynamic-form/dynamic-form.component';

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule,HttpClientModule, ],
  declarations: [ AppComponent, DynamicFormComponent, DynamicFormFieldComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
  }
}
