import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { Card } from './card';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {
  divs = Array(3).fill(0).map((x, i) => i);
  card: Card[] = [];
  
  nextSection() {
    throw new Error('Method not implemented.');
  }

  previousSection() {
    throw new Error('Method not implemented.');
  }
  title = 'SeelenkulinarikFront';
}
