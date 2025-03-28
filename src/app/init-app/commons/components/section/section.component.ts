import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  activeSlideIndex = 0;

  slides = [
    {
      image: '/assets/svg/movil-mockup.svg',
      alt: 'App ellaCrédito',
      title: 'Abre tu app Banca Móvil BCP',
      description: 'En la pantalla principal, selecciona la opción "ellaCrédito".'
    },
    {
      image: '/assets/svg/movil-mockup-two.svg',
      alt: 'Te conoceremos para evaluarte',
      title: 'Te conoceremos para evaluarte',
      description: 'Completa el formulario de “ellaCrédito”, tranquila, estos datos serán protegidos.'
    },
    {
      image: '/assets/svg/movil-mockup-three.svg',
      alt: 'Te evaluamos',
      title: 'Te evaluamos',
      description: 'Completando la evaluación, obtendrás puntos de “ellaCrédito” y obtendrás tus resultados.'
    }
  ];


  constructor(private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  prevSlide() {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.activeSlideIndex = index;
  }

  goToEvaluation() {
    this.router.navigate(['/evaluation']);
  }
}
