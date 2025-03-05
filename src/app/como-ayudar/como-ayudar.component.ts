import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-como-ayudar',
  standalone: true,
  imports: [],
  templateUrl: './como-ayudar.component.html',
  styleUrl: './como-ayudar.component.css'
})
export class ComoAyudarComponent {

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

}