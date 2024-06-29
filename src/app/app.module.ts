import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxHateoasClientConfigurationService, NgxHateoasClientModule} from '@lagoshny/ngx-hateoas-client';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './error-handler/error-alert/not-found.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserDeleteComponent} from './user/user-delete/user-delete.component';
import {UserSearchComponent} from './user/user-search/user-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginBasicModule} from './login-basic/login-basic.module';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {AuthInterceptor} from './login-basic/auth-interceptor';
import {HttpErrorInterceptor} from './error-handler/http-error-interceptor';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {LoggedInGuard} from './login-basic/loggedin.guard';
import {UserService} from './user/user.service';
import {VolunteerKickComponent} from './shelter/volunteer-kick/volunteer-kick.component';
import {ShelterVolunteersListComponent} from './shelter/volunteer-list/volunteer-list.component';
import {ShelterVolunteersAddComponent} from './shelter/volunteer-add/volunteer-add.component';
import {UserDisableComponent} from './user/user-disable/user-disable.component';
import {MedicalRecordListComponent} from './medical-record/medical-list/medical-record-list.component';
import {AddPetComponent} from "./pet/add-pet/add-pet.component";
import {PetFavouriteComponent} from './pet/pet-favourite/pet-favourite.component';
import {MedicalRecordAddComponent} from "./medical-record/medical-add/medical-record-add.component";
import {MatFormField} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MedicalRecordEditComponent} from "./medical-record/medical-edit/medical-record-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    NotFoundComponent,
    UserDetailComponent,
    UserRegisterComponent,
    UserEditComponent,
    UserDeleteComponent,
    ShelterVolunteersAddComponent,
    UserDisableComponent,
    AddPetComponent,
      MedicalRecordEditComponent,
      MedicalRecordAddComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgbCollapseModule,
        NgbDropdownModule,
        NgbPaginationModule,
        NgxHateoasClientModule.forRoot(),
        LoginBasicModule,
        ShelterVolunteersListComponent,
        UserSearchComponent,
        UserListComponent,
        ErrorHandlerModule,
        NgbModule,
        ReactiveFormsModule,
        PetFavouriteComponent,
        MatFormField,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,

    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthenticationBasicService, LoggedInGuard, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(hateoasConfig: NgxHateoasClientConfigurationService) {
    hateoasConfig.configure({
      http: {
        rootUrl: environment.API
      }
    });
  }
}
