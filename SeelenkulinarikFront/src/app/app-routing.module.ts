import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendComponent } from './backend/backend.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { GdprComponent } from './gdpr/gdpr.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: 'gdpr', component: GdprComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'backend', component: BackendComponent },
  { path: '', component: IndexComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
