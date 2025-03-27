import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EvaluationFormComponent } from './pages/evaluation-form/evaluation-form.component';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [RouterOutlet, EvaluationFormComponent],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss'
})
export class EvaluationComponent {

}
