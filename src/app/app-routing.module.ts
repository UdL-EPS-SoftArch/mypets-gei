import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { ShelterVolunteersListComponent } from './shelter/volunteer-list/volunteer-list.component';
import { ShelterVolunteersDetailsComponent } from './shelter/volunteer-details/volunteer-details.component';
import { ShelterVolunteersAddComponent } from './shelter/volunteer-add/volunteer-add.component';
import { ShelterListComponent } from './shelter/shelter-list/shelter-list.component';
import { ShelterCreateComponent } from './shelter/shelter-create/shelter-create.component';
import { ShelterEditComponent } from './shelter/shelter-edit/shelter-edit.component';
import { ShelterDeleteComponent } from './shelter/shelter-delete/shelter-delete.component';
import { CertificateAddComponent } from './shelter/certificate-add/certificate-add.component';
import { UserDisableComponent } from './user/user-disable/user-disable.component';
import {MedicalRecordListComponent} from "./medical-record/medical-list/medical-record-list.component";
import {MedicalRecordAddComponent} from "./medical-record/medical-add/medical-record-add.component";
import { AddPetComponent } from "./pet/add-pet/add-pet.component";
import { PetsGridComponent } from './pet/pet-grid/pets-grid.component';
import { PetDetailsComponent } from './pet/pet-details/pet-details.component';
import { PetDeleteComponent } from './pet/pet-delete/pet-delete.component';
import { ShelterVolunteerGuard } from "./guards/volunteer.role.guard";
import { CertificateValidateComponent } from './shelter/certificate-validate/certificate-validate.component';
import {MedicalRecordEditComponent} from "./medical-record/medical-edit/medical-record-edit.component";


const routes: Routes = [
  { path: 'shelter/certificates/validate', component: CertificateValidateComponent, canActivate: [LoggedInGuard]},
  { path: 'shelter/:id/certificate/add', component: CertificateAddComponent, canActivate: [LoggedInGuard]},
  { path: 'shelters/:id/volunteers/add', component: ShelterVolunteersAddComponent, canActivate: [LoggedInGuard]},
  { path: 'shelters/:id/volunteers/:vId', component: ShelterVolunteersDetailsComponent, canActivate: [LoggedInGuard]},
  { path: 'shelters/:id/volunteers', component: ShelterVolunteersListComponent, canActivate: [LoggedInGuard]},
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/disable', component: UserDisableComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'shelters', component: ShelterListComponent },
  { path: 'shelters/create', component: ShelterCreateComponent, canActivate: [LoggedInGuard] },
  { path: 'shelters/:id/edit', component: ShelterEditComponent, canActivate: [LoggedInGuard] },
  { path: `shelters/:id/delete`, component: ShelterDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'medical-records', component: MedicalRecordListComponent },
  { path: 'medical-records/add', component: MedicalRecordAddComponent },
  { path: 'medical-records/:petId', component: MedicalRecordListComponent },
  { path: 'medical-records/:recordId/:petId/edit', component: MedicalRecordEditComponent },
  { path: 'about', component: AboutComponent},
  { path: 'pet-grid/add-pet', component: AddPetComponent, canActivate: [ShelterVolunteerGuard]},
  { path: 'pet-details/:id', component:PetDetailsComponent,title:'Pet Details'},
  { path: 'pet-details/:id/delete', component:PetDeleteComponent,title:'Pet Delete', canActivate: [LoggedInGuard]},
  { path: 'pets-grid', component: PetsGridComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
