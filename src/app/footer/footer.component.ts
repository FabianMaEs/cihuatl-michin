import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  toggleCredits() {
    const credits = document.getElementById('credits');
    credits?.classList.toggle('hidden');
  }
}
