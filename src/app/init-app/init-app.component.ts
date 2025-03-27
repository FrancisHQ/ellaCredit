import { Component } from '@angular/core';
import { HeaderComponent } from '../evaluation/commons/components/header';
import { FooterComponent } from './commons/components/footer';
import { TopHeaderComponent } from './commons/components/top-header';
import { NavBarComponent } from './commons/components/nav-bar';
import { BannerComponent } from './commons/components/banner/banner.component';
import { SectionComponent } from './commons/components/section/section.component';
import { RouterOutlet } from '@angular/router';
import { OurClientsComponent } from './commons/components/our-clients';

@Component({
  selector: 'app-init-app',
  standalone: true,
  imports: [TopHeaderComponent, NavBarComponent, BannerComponent, SectionComponent, OurClientsComponent, FooterComponent],
  templateUrl: './init-app.component.html',
  styleUrl: './init-app.component.scss'
})
export class InitAppComponent {

}
