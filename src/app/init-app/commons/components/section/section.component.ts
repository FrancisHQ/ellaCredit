import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  constructor(private router: Router) {}

  goToEvaluation() {
    this.router.navigate(['/evaluation']);
  }
}
