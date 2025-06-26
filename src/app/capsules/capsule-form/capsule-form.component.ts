import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Capsule } from '../../shared/models';

@Component({
  selector: 'app-capsule-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './capsule-form.component.html'
})
export class CapsuleFormComponent implements OnInit {
  form!: FormGroup;
  capsuleId?: number;
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
      ownerId: [null, Validators.required],
      message: ['', Validators.required],
      sendDate: ['', Validators.required],
      recipients: this.fb.array([ this.fb.control('', [Validators.required, Validators.email]) ])
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.capsuleId = +params['id'];
        this.api.getCapsule(this.capsuleId).subscribe((c: Capsule) => {
          this.form.patchValue({
            ownerId: c.ownerId,
            message: c.message,
            sendDate: c.sendDate
          });
          this.recipients.clear();
          c.recipients.forEach(r => this.recipients.push(this.fb.control(r, [Validators.required, Validators.email])));
        });
      }
    });
  }

  get recipients(): FormArray {
    return this.form.get('recipients') as FormArray;
  }

  addRecipient(): void {
    this.recipients.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  removeRecipient(i: number): void {
    if (this.recipients.length > 1) {
      this.recipients.removeAt(i);
    }
  }

  submit(): void {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.form.invalid) return;
    this.loading = true;
    const cap: Capsule = {
      ...this.form.value,
      id: this.capsuleId,
      sent: false
    };
    if (this.isEdit) {
      this.api.updCapsule(cap).subscribe({
        next: () => {
          this.successMsg = 'Cápsula salva com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/capsules']), 1000);
        },
        error: err => {
          this.errorMsg = `Erro ao salvar cápsula: ${err.error?.message || err.message}`;
          this.loading = false;
        }
      });
    } else {
      this.api.addCapsule(cap).subscribe({
        next: () => {
          this.successMsg = 'Cápsula criada com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/capsules']), 1000);
        },
        error: err => {
          this.errorMsg = `Erro ao criar cápsula: ${err.error?.message || err.message}`;
          this.loading = false;
        }
      });
    }
  }
}
