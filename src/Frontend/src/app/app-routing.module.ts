import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenCaseScreenComponent } from './pages/open-case-screen/open-case-screen.component';
import { RegisterExhibitScreenComponent } from './pages/register-exhibit-screen/register-exhibit-screen.component';
import { GenLabFormScreenComponent } from './pages/gen-lab-form-screen/gen-lab-form-screen.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
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
    path: 'genLabForm',
    component: GenLabFormScreenComponent,
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
];
