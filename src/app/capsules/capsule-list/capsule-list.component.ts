import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';
import { Capsule } from '../../shared/models';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-capsule-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './capsule-list.component.html'
})
export class CapsuleListComponent implements OnInit {
  capsules: Capsule[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCapsules();
  }

  loadCapsules(): void {
    this.api.getCapsules().subscribe(data => this.capsules = data);
  }

  edit(c: Capsule): void {
    this.router.navigate(['/capsules', c.id, 'edit']);
  }

  delete(c: Capsule): void {
    if (confirm(`Excluir cápsula "${c.message.substring(0,20)}..."?`)) {
      this.api.delCapsule(c.id!).subscribe(() => this.loadCapsules());
    }
  }
}
