import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../commons/components/header';
import { FormComponent } from '../../commons/components/form';
import { QuizComponent } from '../../commons/components/quiz';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [CommonModule, HeaderComponent, QuizComponent, FormComponent],
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.scss',
})
export class EvaluationFormComponent {
  showForm = true;

  constructor(private location: Location) {}

  onFormSubmitted() {
    this.showForm = false;
  }

  goBack() {
    if (!this.showForm) {
      this.showForm = true;
    } else {
      this.location.back();
    }
  }
}
