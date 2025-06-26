import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';
import { User } from '../../shared/models';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.api.getUsers().subscribe(data => this.users = data);
  }

  edit(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  delete(user: User): void {
    if (confirm(`Deletar usuário ${user.username}?`)) {
      this.api.delUser(user.id!).subscribe(() => this.loadUsers());
    }
  }
}
