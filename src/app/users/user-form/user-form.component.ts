import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  userId?: number;
  isEdit = false;
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePhotoUrl: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.userId = +params['id'];
        this.api.getUser(this.userId).subscribe((u: User) => {
          this.form.patchValue(u);
        });
      }
    });
  }

  submit(): void {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.form.invalid) return;
    this.loading = true;
    const user: User = this.form.value;
    if (this.isEdit) {
      user.id = this.userId;
      this.api.updUser(user).subscribe({
        next: () => {
          this.successMsg = 'Usuário salvo com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/users']), 1000);
        },
        error: err => {
          this.errorMsg = `Erro ao salvar usuário: ${err.error?.message || err.message}`;
          this.loading = false;
        }
      });
    } else {
      this.api.addUser(user).subscribe({
        next: () => {
          this.successMsg = 'Usuário criado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/users']), 1000);
        },
        error: err => {
          this.errorMsg = `Erro ao criar usuário: ${err.error?.message || err.message}`;
          this.loading = false;
        }
      });
    }
  }
}
