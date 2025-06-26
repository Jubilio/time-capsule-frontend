import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleFormComponent } from './capsule-form.component';

describe('CapsuleFormComponent', () => {
  let component: CapsuleFormComponent;
  let fixture: ComponentFixture<CapsuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapsuleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapsuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
