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
import {MedicalRecordListComponent} from "./medical-record/medical-list/medical-record-list.component";

import {ShelterVolunteerGuard} from "./guards/volunteer.role.guard";
import {MedicalRecordAddComponent} from "./medical-record/medical-add/medical-record-add.component";
import { AddPetComponent } from "./pet/add-pet/add-pet.component";
import { PetsGridComponent } from './pet/pet-grid/pets-grid.component';
import { PetDetailsComponent } from './pet/pet-details/pet-details.component';
import { PetDeleteComponent } from './pet/pet-delete/pet-delete.component';
import {MedicalRecordEditComponent} from "./medical-record/medical-edit/medical-record-edit.component";

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  //{ path: 'medical-records', component: MedicalRecordListComponent }, #Need to be commented out to avoid conflict with new route structure
  { path: 'medical-records/add', component: MedicalRecordAddComponent },
  { path: 'medical-records/:petId', component: MedicalRecordListComponent },
  { path: 'medical-records/:recordId/:petId/edit', component: MedicalRecordEditComponent },
  { path: 'about', component: AboutComponent},
  { path: 'pets-grid', component: PetsGridComponent},
  { path: 'pet-details/:id', component:PetDetailsComponent,title:'Pet Details'},
  { path: 'pet-details/:id/delete', component:PetDeleteComponent,title:'Pet Delete'},
  { path: 'pet-grid/add-pet', component: AddPetComponent, canActivate: [LoggedInGuard]},
  { path: 'pet-details/:id', component:PetDetailsComponent,title:'Pet Details'},
  { path: 'pet-details/:id/delete', component:PetDeleteComponent,title:'Pet Delete', canActivate: [LoggedInGuard]},
  { path: 'pets-grid', component: PetsGridComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'add-pet', component: AddPetComponent, canActivate: [ShelterVolunteerGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
