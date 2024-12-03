import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import anime from'animejs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    // Seleccionar todos los elementos con la clase "hidden"
    const hiddenElements = document.querySelectorAll('.hidden');

    // Configurar el Intersection Observer
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Agregar la clase para activar la animación
            entry.target.classList.add('fade-in');

            // Dejar de observar el elemento (opcional)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // 20% del elemento debe estar visible para activar la animación
      }
    );

    // Observar cada elemento
    hiddenElements.forEach((el) => observer.observe(el));
  }

  wave1 = "M0 108.306L50 114.323C100 120.34 200 132.374 300 168.476C400 204.578 500 264.749 600 246.698C700 228.647 800 132.374 900 108.306C1000 84.2382 1100 132.374 1150 156.442L1200 180.51V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V108.306Z";
  wave2 = "M0 250L50 244.048C100 238.095 200 226.19 300 226.19C400 226.19 500 238.095 600 232.143C700 226.19 800 202.381 900 196.429C1000 190.476 1100 202.381 1150 208.333L1200 214.286V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z";
  wave3 = "M0 250L50 238.095C100 226.19 200 202.381 300 166.667C400 130.952 500 83.3333 600 101.19C700 119.048 800 202.381 900 214.286C1000 226.19 1100 166.667 1150 136.905L1200 107.143V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z";
  wave4 = "M0 125L50 111.111C100 97.2222 200 69.4444 300 97.2222C400 125 500 208.333 600 236.111C700 263.889 800 236.111 900 229.167C1000 222.222 1100 236.111 1150 243.056L1200 250V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V125Z";

  ngOnInit(): void {
    console.log('Hello World!');
    anime({
      targets: '.wave-bottom > path',
      easing: 'linear',
      duration: 20000,
      loop: true,
      d: [
        { value: [this.wave1, this.wave2] },
        { value: this.wave3 },
        { value: this.wave4 },
        { value: this.wave1 },
      ],
    });
  }
}