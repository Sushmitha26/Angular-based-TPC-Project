import { Routes,RouterModule }from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { StatusComponent } from './status/status.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { ProfileResolverService } from './profile-resolver.service';
import { OncampusListComponent } from './oncampus-list/oncampus-list.component';
import { SelectedComponent } from './selected/selected.component';
import { EligibleComponent } from './eligible/eligible.component';
import { IneligibleComponent } from './ineligible/ineligible.component';
import { CmpRegisterComponent } from './cmp-register/cmp-register.component';

const appRoutes: Routes = [
  { path:'', component: LoginComponent},
  { path:'register', component: RegisterComponent},
  { path:'reset_password', component: ResetPasswordComponent},
  { path: 'set_new_password/:uidb64/:token', component: NewPasswordComponent},
  { path: 'placement', component: NavbarComponent, children: [
    { path:'home', component: HomeComponent,children:[
      { path:'selected', component: SelectedComponent},
      { path:'eligible', component: EligibleComponent, children: [
        
      ]},
      { path:'ineligible', component: IneligibleComponent},
    ]},
    { path: 'status', component: StatusComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'feedback', component: FeedbackComponent},
    { path: 'about', component: AboutComponent}
    ],
  },
  { path:'company registration/:companyName', component: CmpRegisterComponent},
  { path: 'placement/home/eligible/company registration/:companyName',   redirectTo: '/company registration/:companyName', pathMatch: 'full' }
  
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    NavbarComponent,
    NewPasswordComponent,
    StatusComponent,
    ProfileComponent,
    FeedbackComponent,
    AboutComponent,
    OncampusListComponent,
    EligibleComponent,
    IneligibleComponent,
    SelectedComponent,
    CmpRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
