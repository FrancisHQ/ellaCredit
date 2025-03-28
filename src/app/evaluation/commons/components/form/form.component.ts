import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  form: FormGroup;
  currentStep = 1;
  placeholderText: string = '12345678'; 

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dniType: ['1'],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      terms: [false, Validators.requiredTrue],
      ocupacion: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      tieneIngresos: ['', Validators.required],
      otp: this.fb.array(
        Array(6)
          .fill('')
          .map(
            () =>
              new FormControl('', [
                Validators.required,
                Validators.pattern(/^[0-9]$/),
              ])
          )
      ),
    });
  }

  ngOnInit() {
    this.form.get('dniType')?.valueChanges.subscribe(value => {
      switch (value) {
        case '1':
          this.placeholderText = '12345678';
          break;
        case '2':
          this.placeholderText = '123456789012123';
          break;
        case '3':
          this.placeholderText = '123456789123';
          break;
      }
    });
  }

  get otpControls(): FormControl[] {
    return (this.form.get('otp') as FormArray).controls as FormControl[];
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return (
          this.form.get('dni')?.valid &&
          this.form.get('email')?.valid &&
          this.form.get('terms')?.value
        );
      case 2:
        return this.isOtpComplete();
      case 3:
        return (
          this.form.get('ocupacion')?.value &&
          this.form.get('nivelEducativo')?.valid &&
          this.form.get('tieneIngresos')?.valid
        );
      default:
        return false;
    }
  }

  isOtpComplete(): boolean {
    return this.otpControls.every((control) => control.valid);
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (!/^\d*$/.test(value)) {
      input.value = '';
      this.otpControls[index].setValue('');
      return;
    }

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `.otp-input:nth-child(${index + 2})`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number) {
    if (
      event.key === 'Backspace' &&
      !this.otpControls[index].value &&
      index > 0
    ) {
      const prevInput = document.querySelector(
        `.otp-input:nth-child(${index})`
      ) as HTMLInputElement;
      prevInput?.focus();
      event.preventDefault();
    }
  }

  resendCode() {
    console.log('Enviando código');
    this.otpControls.forEach((control) => control.reset(''));
  }

  onSubmit() {
    if (this.isStepValid()) {
      if (this.currentStep < 3) {
        this.currentStep++;
      } else {
        console.log('Formulario completo:', {
          ...this.form.value,
          otp: this.otpControls.map((c) => c.value).join(''),
        });
        this.formSubmitted.emit();
      }
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
