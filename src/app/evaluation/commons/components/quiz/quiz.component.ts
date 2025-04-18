import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';

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
  currentScore: number = 0;
  videoWatched: boolean = false;
  videoTimer: any;
  showTrustedContactFields: boolean = false;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      step1: this.fb.group({
        walletActive: ['', Validators.required],
      }),
      step2: this.fb.group({
        monthlyIncome: ['', [Validators.required]],
      }),
      step3: this.fb.group({
        hasTrustedContact: ['', Validators.required],
        trustedContactName: [''],
        trustedContactDocument: ['', [Validators.pattern(/^[0-9]{8}$/)]],
      }),
      // step4: this.fb.group({
      //   hasGuarantor: ['', Validators.required],
      // }),
      step4: this.fb.group({
        usesApps: ['', Validators.required],
      }),
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

  // get step5(): FormGroup {
  //   return this.quizForm.get('step5') as FormGroup;
  // }

  validateNumericInput(event: KeyboardEvent) {
    const allowedKeys = /[0-9]/;
    if (!allowedKeys.test(event.key)) {
      event.preventDefault();
    }
  }

  nextStep() {
    if (!this.validateCurrentStep()) {
      return;
    }

    if (this.currentStep < 5) {
      this.currentStep++;
      this.calculateScore();
      console.log('currentScore', this.currentScore);
    } else if (this.currentStep === 5) {
      this.currentStep++;

      this.calculateScore();
      this.currentScore += 10;
      console.log('Puntaje final:', this.currentScore);
    }
  }

  calculateScore() {
    let score = 0;

    if (this.quizForm.get('step1.walletActive')?.value === '1') {
      score += 15;
    } else if (this.quizForm.get('step1.walletActive')?.value === '2') {
      score += 0;
    }

    const income = parseInt(
      this.quizForm.get('step2.monthlyIncome')?.value || 0
    );
    if (income >= 1500) {
      score += 30;
    } else if (income >= 800) {
      score += 20;
    } else if (income >= 500) {
      score += 10;
    } else {
      score += 0;
    }

    if (this.quizForm.get('step3.hasTrustedContact')?.value === '1') {
      const contactName = this.quizForm.get('step3.trustedContactName')?.value;
      const contactDocument = this.quizForm.get(
        'step3.trustedContactDocument'
      )?.value;
      if (contactName && contactDocument) {
        score += 20;
      }
    } else {
      score += 0;
    }

    // if (this.quizForm.get('step4.hasGuarantor')?.value === '1') {
    //   score += 17;
    // } else if (this.quizForm.get('step4.hasGuarantor')?.value === '2') {
    //   score += 10;
    // }

    if (this.quizForm.get('step4.usesApps')?.value === '1') {
      score += 10;
    } else if (this.quizForm.get('step4.usesApps')?.value === '2') {
      score += 0;
    }

    if (this.videoWatched) {
      score += 10;
    } else {
      score += 0;
    }

    this.currentScore = Math.min(score, 100);
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
      // case 5:
      //   if (this.step5.invalid) {
      //     this.markAllAsTouched(this.step5);
      //     return false;
      //   }
      //   break;
    }
    return true;
  }

  private markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  markVideoAsWatched() {
    this.videoWatched = true;
    console.log('se vio el video?', this.videoWatched);

    this.calculateScore();
  }

  isCurrentStepInvalid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.step1.invalid;
      case 2:
        return this.step2.invalid;
      case 3:
        return this.step3.invalid;
      case 4:
        return this.step4.invalid;
      // case 5:
      //   return this.step5.invalid;
      default:
        return false;
    }
  }
  
  getApprovedAmount(): number {
    const income = parseInt(this.quizForm.get('step2.monthlyIncome')?.value) || 0;
    return income * 2.5;
  }
}
