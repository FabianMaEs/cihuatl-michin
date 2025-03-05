import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-ecosistemas',
  standalone: true,
  imports: [],
  templateUrl: './ecosistemas.component.html',
  styleUrl: './ecosistemas.component.scss'
})
export class EcosistemasComponent implements AfterViewInit {


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
        threshold: 0.1, // 20% del elemento debe estar visible para activar la animación
      }
    );

    // Observar cada elemento
    hiddenElements.forEach((el) => observer.observe(el));      
  }

            

}
