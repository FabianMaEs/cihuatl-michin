import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { log } from '../logger';

@Component({
  selector: 'app-colorear',
  templateUrl: './colorear.component.html',
  styleUrls: ['./colorear.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ColorearComponent implements OnInit {
  colorSeleccionado = '#1D6D79'; // Color predeterminado
  colores: string[] = [
    '#1D6D79',
    '#4FB1B1',
    '#00A8A8',
    '#7C9A92',
    '#33B5E5',
    '#FFB6C1',
    '#98D8D3',
    '#1A8A6C',
    '#006E6D',
    '#7FFFD4',
    '#2E8B57',
    '#80E0A7',
    '#00CED1',
    '#40E0D0',
    '#00BFFF',
    '#ADD8E6',
    '#20B2AA',
    '#B0E0E6',
    '#006994',
    '#4682B4',
  ];

  @ViewChild('dibujoContainer', { static: true }) dibujoContainer!: ElementRef;
  @ViewChild('colorInput', { static: false }) colorInput!: ElementRef;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    // Elimina la sanitización innecesaria
    this.http.get('assets/dibujos/pez.svg', { responseType: 'text' })
    .subscribe((svg) => {
      this.dibujoContainer.nativeElement.innerHTML = svg;
      this.agregarEventosDeColor();
    });

  }

  positionX = 0;
  positionY = 0;

  // Capturar el movimiento del mouse
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Mostrar el circulo de color
    this.positionX = event.clientX - 5; // Ajuste para centrar el círculo (radio de 25px)
    this.positionY = event.clientY - 5; // Ajuste para centrar el círculo (radio de 25px)
  }

  // Capturar el desplazamiento de la pantalla
  @HostListener('window:scroll', [])
  onWindowScroll() {}

  agregarEventosDeColor() {
    const partes = this.dibujoContainer.nativeElement.querySelectorAll(
      'path[id^="parte"], rect[id^="parte"]'
    );

    partes.forEach((parte: HTMLElement) => {
      parte.addEventListener('click', () => {
        log('Parte seleccionada:', parte.id);
        // Modificar directamente el estilo de relleno
        parte.style.fill = this.colorSeleccionado;
      });
    });
  }

  seleccionarColor(color: string) {
    this.colorSeleccionado = color;
  }

  // Detectar clic derecho en los botones de color
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    const button = event.target as HTMLElement;
    if (
      button.tagName === 'BUTTON' &&
      button.classList.contains('color-button')
    ) {
      event.preventDefault(); // Evita el menú contextual por defecto
      this.showColorPicker(event, button);
    }
  }

  touchStartTime = 0;
  touchTimeout: any;

  // Detectar toque largo en los botones de color
  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const button = event.target as HTMLElement;
    if (
      button.tagName === 'BUTTON' &&
      button.classList.contains('color-button')
    ) {
      this.touchStartTime = Date.now();

      // Esperar un tiempo para saber si es un toque largo
      this.touchTimeout = setTimeout(() => {
        this.showColorPicker(event as unknown as MouseEvent, button); // Mostrar selector de color
      }, 500); // Tiempo para detectar toque largo (500ms)
    }
  }

  // Mostrar el selector de color
  showColorPicker(event: MouseEvent, button: HTMLElement) {
    // Mostrar el selector de color
    this.colorInput.nativeElement.style.display = 'block';
    this.colorInput.nativeElement.style.left = `${event.clientX}px`;
    this.colorInput.nativeElement.style.top = `${event.clientY}px`;

    // Actualizar el valor del selector con el color actual
    this.colorInput.nativeElement.value = this.colorSeleccionado;
    let colorSelecicionado = this.colorSeleccionado;

    // Agregar evento de cambio de color
    this.colorInput.nativeElement.onchange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.colorSeleccionado = input.value;
      const colorIndex = this.colores.indexOf(button.style.backgroundColor);
      if (colorIndex !== -1) {
        this.colores[colorIndex] = this.colorSeleccionado; // Sustituir el color en el arreglo de colores
      }
      button.style.backgroundColor = this.colorSeleccionado; // Cambiar color del botón
      // Sustituir el color en el arreglo
      this.colores[this.colores.indexOf(colorSelecicionado)] =
        this.colorSeleccionado;
    };
    // ocultar el selector de color
    this.colorInput.nativeElement.onblur = () => {
      this.colorInput.nativeElement.style.display = 'none';
    };
  }

  ocultarMsj() {
    const mensaje = document.getElementById('mensaje');
    if (mensaje) {
      mensaje.style.display = 'none';
    }
  }
}
