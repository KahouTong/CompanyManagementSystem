import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SummaryComponent } from './modules/summary/summary.component';
import { AuthGaurdService } from './service/auth-guard.service';

const routes: Routes = [
  {
  path: '',
  component: DefaultComponent,canActivate:[AuthGaurdService],
  children: [{
    path: '',
    component: DashboardComponent
  },{
    path: 'summary',
    component: SummaryComponent
  }] 
},
{ path: 'login', component: LoginComponent},
{ path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService]  },
{ path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
