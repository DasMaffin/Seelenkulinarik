import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { BackendComponent } from './backend/backend.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCardModalComponent } from './add-card-modal/add-card-modal.component';
import { UpdateCardModalComponent } from './update-card-modal/update-card-modal.component';
import { DeleteCardModalComponent } from './delete-card-modal/delete-card-modal.component';
import { AddImageModalComponent } from './add-image-modal/add-image-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BackendComponent,
    IndexComponent,
    LoginComponent,
    AddCardModalComponent,
    UpdateCardModalComponent,
    DeleteCardModalComponent,
    AddImageModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
