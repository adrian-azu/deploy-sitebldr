import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { ClientaccountComponent } from './client/clientaccount/clientaccount.component';
import { AdminaccountComponent } from './admin/adminaccount/adminaccount.component';
import { ProjectmanageraccountComponent } from './projectmanager/projectmanageraccount/projectmanageraccount.component';

import { AuthguardGuard } from './_helpers/authguard.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'Client',
    component: ClientaccountComponent,
    canActivate: [AuthguardGuard],
    data : {
      expectedRole: 'Client'
    }
  },
  {
    path: 'Admin',
    component: AdminaccountComponent,
    canActivate: [AuthguardGuard],
    data : {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'ProjectManager',
    component: ProjectmanageraccountComponent,
    canActivate: [AuthguardGuard],
    data : {
      expectedRole: 'ProjectManager'
    }
  },
  {
    path: 'Registration',
    component: RegistrationComponent
  },
  { path: '**', redirectTo: ''}      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
