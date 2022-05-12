import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxDefaultOptions,
  MatCheckboxModule,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
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
import { SharedDataService } from './core/services/shared-data.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { MatStepperModule } from '@angular/material/stepper';
import { DynamicFormComponent } from './core/components/dynamic-form/dynamic-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MonthlySummaryScreenComponent } from './pages/monthly-summary-screen/monthly-summary-screen.component';
import { SearchCaseScreenComponent } from './pages/search-case-screen/search-case-screen.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ResultsScreenComponent } from './pages/results-screen/results-screen.component';
import { ExhibitsInCaseScreenComponent } from './pages/exhibits-in-case-screen/exhibits-in-case-screen.component';
import { DynamicTableComponent } from './core/components/dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { SamplesScreenComponent } from './pages/samples-screen/samples-screen.component';
import { ExhibitsNavigatorScreenComponent } from './pages/exhibits-navigator-screen/exhibits-navigator-screen.component';
import { YearlySummaryScreenComponent } from './pages/yearly-summary-screen/yearly-summary-screen.component';
import { SamplesNavigatorScreenComponent } from './pages/samples-navigator-screen/samples-navigator-screen.component';
import { SamplesInCaseScreenComponent } from './pages/samples-in-case-screen/samples-in-case-screen.component';
import { EditCaseScreenComponent } from './pages/edit-case-screen/edit-case-screen.component';

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
    MatStepperModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatAutocompleteModule,
    MatTableModule,
  ],

  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent,
    routingComponents,
    MainScreenComponent,
    MonthlySummaryScreenComponent,
    SearchCaseScreenComponent,
    ResultsScreenComponent,
    ExhibitsInCaseScreenComponent,
    DynamicTableComponent,
    SamplesScreenComponent,
    ExhibitsNavigatorScreenComponent,
    YearlySummaryScreenComponent,
    SamplesNavigatorScreenComponent,
    SamplesInCaseScreenComponent,
    EditCaseScreenComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    SharedDataService,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
})
export class AppModule {
  constructor() {}
}
