import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  currentStep = 1;
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      step1: this.fb.group({
        walletActive: ['', Validators.required]
      }),
      step2: this.fb.group({
        monthlyIncome: ['', [Validators.required, Validators.min(0)]]
      }),
      step3: this.fb.group({
        trustedContactName: ['', Validators.required],
        trustedContactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
      }),
      step4: this.fb.group({
        hasGuarantor: ['', Validators.required]
      }),
      step5: this.fb.group({
        usesApps: ['', Validators.required]
      })
    });
  }

  // Getters para acceder fácilmente a los FormGroups
  get step1(): FormGroup {
    return this.quizForm.get('step1') as FormGroup;
  }

  get step2(): FormGroup {
    return this.quizForm.get('step2') as FormGroup;
  }

  get step3(): FormGroup {
    return this.quizForm.get('step3') as FormGroup;
  }

  get step4(): FormGroup {
    return this.quizForm.get('step4') as FormGroup;
  }

  get step5(): FormGroup {
    return this.quizForm.get('step5') as FormGroup;
  }

  nextStep() {
    // Validar el paso actual antes de avanzar
    if (!this.validateCurrentStep()) {
      return;
    }

    if (this.currentStep < 6) {
      this.currentStep++;

      if (this.currentStep === 6) {
        setTimeout(() => {
          const video = document.querySelector('video') as HTMLVideoElement;
          if (video) {
            video.play();
          }
        }, 500);
      }
    }
  }

  private validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        if (this.step1.invalid) {
          this.markAllAsTouched(this.step1);
          return false;
        }
        break;
      case 2:
        if (this.step2.invalid) {
          this.markAllAsTouched(this.step2);
          return false;
        }
        break;
      case 3:
        if (this.step3.invalid) {
          this.markAllAsTouched(this.step3);
          return false;
        }
        break;
      case 4:
        if (this.step4.invalid) {
          this.markAllAsTouched(this.step4);
          return false;
        }
        break;
      case 5:
        if (this.step5.invalid) {
          this.markAllAsTouched(this.step5);
          return false;
        }
        break;
    }
    return true;
  }

  private markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}