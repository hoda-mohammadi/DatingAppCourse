import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgFor } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { User } from '../_models/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgFor, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  router = inject(Router);
  toastr= inject(ToastrService);
  model: any = {};
  items: string[] = ['The first choice!', 'Edit User', 'Logout'];

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        this.router.navigateByUrl("/");
        this.toastr.error(error.error);
      },
    });
    console.log(this.model);
  }

  logout() {
    this.accountService.logout();
  }
}
