import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { authGuard } from './_guards/auth.guard';
import { UserListsComponent } from './user-lists/user-lists.component';

export const routes: Routes = [
  { //adding dummy path
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent},
      { path: 'members', component: MemberListComponent },
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'user-lists', component: UserListsComponent },
    ],
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
