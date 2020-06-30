import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClientaccountComponent } from './client/clientaccount/clientaccount.component';
import { AdminaccountComponent } from './admin/adminaccount/adminaccount.component';
import { ProjectmanageraccountComponent } from './projectmanager/projectmanageraccount/projectmanageraccount.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordstrengthComponent } from './registration/passwordstrength/passwordstrength.component';
import { EmailverificationComponent } from './registration/emailverification/emailverification.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ClientaccountComponent,
    AdminaccountComponent,
    ProjectmanageraccountComponent,
    RegistrationComponent,
    PasswordstrengthComponent,
    EmailverificationComponent,
    ForgotpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
