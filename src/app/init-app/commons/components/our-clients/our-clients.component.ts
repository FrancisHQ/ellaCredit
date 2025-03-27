import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-clients.component.html',
  styleUrl: './our-clients.component.scss'
})
export class OurClientsComponent {
  clients = [
    {
      name: 'Felicita de la Cruz',
      image: '/assets/img/client-1.png',
      testimonial: 'Gracias a ellaCrédito pude sacar adelante mi negocio de verduras. El proceso fue súper claro y lo mejor es que sentí que realmente confiaban en mí, algo que no me pasaba con otros bancos.'
    },
    {
      name: 'Raquel Cevero',
      image: '/assets/img/client-1.png',
      testimonial: 'Conseguí el préstamo que necesitaba, pero además descubrí una red de mujeres como yo, con ganas de salir adelante. Se siente bien no estar sola.'
    },
    {
      name: 'Paola Castañeda',
      image: '/assets/img/client-1.png',
      testimonial: 'Soy independiente y en otros lugares no consideraban mis ingresos. ellaCrédito evaluó mi caso con empatía y hoy puedo seguir creciendo con mi trabajo.'
    }
  ];
}
