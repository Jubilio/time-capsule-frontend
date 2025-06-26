import { Routes } from '@angular/router';
import { UserListComponent } from '../users/user-list/user-list.component';
import { UserFormComponent } from '../users/user-form/user-form.component';
import { CapsuleFormComponent } from '../capsules/capsule-form/capsule-form.component';
import { CapsuleListComponent } from '../capsules/capsule-list/capsule-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id/edit', component: UserFormComponent },
  { path: 'capsules', component: CapsuleListComponent },
  { path: 'capsules/new', component: CapsuleFormComponent },
  { path: 'capsules/:id/edit', component: CapsuleFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
