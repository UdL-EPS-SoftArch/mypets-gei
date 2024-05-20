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
import { AddPetComponent } from "./pet/add-pet/add-pet.component";
import { PetsGridComponent } from './pet/pet-grid/pets-grid.component';
import { PetDetailsComponent } from './pet/pet-details/pet-details.component';
import { PetDeleteComponent } from './pet/pet-delete/pet-delete.component';
import { ShelterVolunteerGuard } from "./guards/volunteer.role.guard";

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'pet-grid/add-pet', component: AddPetComponent, canActivate: [LoggedInGuard]},
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
