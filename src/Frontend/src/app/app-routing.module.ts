import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenCaseScreenComponent } from './pages/open-case-screen/open-case-screen.component';
import { RegisterExhibitScreenComponent } from './pages/register-exhibit-screen/register-exhibit-screen.component';
import { GenLabFormScreenComponent } from './pages/gen-lab-form-screen/gen-lab-form-screen.component';
import { EditExhibitScreenComponent } from './pages/edit-exhibit-screen/edit-exhibit-screen.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { SearchCaseScreenComponent } from './pages/search-case-screen/search-case-screen.component';
import { ResultsScreenComponent } from './pages/results-screen/results-screen.component';
import { ExhibitsInCaseScreenComponent } from './pages/exhibits-in-case-screen/exhibits-in-case-screen.component';
import { ExhibitsNavigatorScreenComponent } from './pages/exhibits-navigator-screen/exhibits-navigator-screen.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainScreenComponent,
  },
  {
    path: 'case',
    component: OpenCaseScreenComponent,
  },
  {
    path: 'registerExhibit',
    component: RegisterExhibitScreenComponent,
  },
  {
    path: 'searchCase',
    component: SearchCaseScreenComponent,
  },
  {
    path: 'searchCaseResult',
    component: ResultsScreenComponent,
  },
  {
    path: 'genLabForm',
    component: GenLabFormScreenComponent,
  },
  {
    path: 'editExhibit',
    component: EditExhibitScreenComponent,
  },
  {
    path: 'case/:id/exhibits',
    component: ExhibitsInCaseScreenComponent,
  },
  {
    path:'exhibitNavigator',
    component: ExhibitsNavigatorScreenComponent,

  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  MainScreenComponent,
  OpenCaseScreenComponent,
  RegisterExhibitScreenComponent,
  GenLabFormScreenComponent,
  EditExhibitScreenComponent,
  ExhibitsInCaseScreenComponent,
];
