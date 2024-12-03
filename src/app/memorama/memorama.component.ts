import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-memorama',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate('300ms ease-in')]),
      transition('* => void', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    // Animación para el contador
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ]),
    ]),
    trigger('staggerResults', [
      transition(':enter', [
        query(':self', style({ opacity: 0, transform: 'translateY(20px)' }), { optional: true }),
        query(':self', [
          stagger(300, [
            animate(
              '600ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
  ],
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.scss'],
})
export class MemoramaComponent implements OnInit {

  private countdownInterval: any;
  private timerInterval: any;

  tarjetas: { imgSrc: string; text: string; flipped: boolean; isMatched: boolean }[] = [];
  selecciones: number[] = [];
  tiempo: any;
  movimientos: any;
  mostrarTarjetas: boolean = false;
  mostrarBotonReiniciar: boolean = false
  timeout: any;

  sonidoHoja = './../../assets/quiz/sonidos/woosh.mp3';
  sonidoCorrecto = './../../assets/memorama/sonidos/correcto.mp3';
  sonidoIncorrecto = './../../assets/memorama/sonidos/incorrecto.mp3';
  sonidoPop = './../../assets/quiz/sonidos/pop.mp3';
  sonidoVictoria = './../../assets/quiz/sonidos/victoria.mp3';
  sonidoDerrota = './../../assets/quiz/sonidos/derrota.mp3';
  sonidoIniciarTimer = './../../assets/quiz/sonidos/beeps.mp3';
  tecla = './../../assets/quiz/sonidos/tecla.mp3';
  countdownFinished = false;
  gameFinished: boolean = false;

  score: number = 0;
  resultadosCadena = "RESULTADOS";
  resultados: string = "";
  puntuacionCadena = ""
  puntuacion: string = "";
  mensajeFinal: string = "";
  countdown: number | null = 3;
  puntajeTotal: number = 0;
  puntajeTotalMensaje: number = 0;
  mensajeFinalizado = false;

  // Mensaje aleatorio de "¡YA!", "¡LISTO!", "¡VAMOS!", etc.
  yaMensaje = ["¡YA!", "¡LISTO!", "¡VAMOS!", "¡ADELANTE!", "¡EMPEZAMOS!"][Math.floor(Math.random() * 5)];

  constructor() {
    this.movimientos = 0;
    this.tiempo = 0;
  }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
/*     this.countdownFinished = true;
    this.generarTablero(); */
    this.playSound(this.sonidoIniciarTimer);

    // Limpia intervalos previos si existen
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      if (this.countdown !== null) {
        this.countdown--;
      }
      if (this.countdown !== null && this.countdown < 0) {
        clearInterval(this.countdownInterval); // Limpia el intervalo actual
        this.countdownFinished = true;

        // Muestra las tarjetas después de una breve pausa
        this.timeout = setTimeout(() => {
          this.generarTablero();
          this.revelarTarjetasInicialmente();
        }, 500);

        this.startTimer();
      }
    }, 1000);
  }

  startTimer() {
    // Limpia intervalos previos si existen
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.tiempo++;
      if (this.gameFinished) {
        clearInterval(this.timerInterval); // Detén el intervalo si el juego ha terminado
      }
    }, 1000);
  }

  private iconos: { img: string; text: string }[] = [];

  cargarIconos(numberOfPairs: number = 6) {
    const iconos = [
      { img: 'assets/memorama/ducha.jpeg', text: 'Bañarse en 5 minutos' },
      { img: 'assets/memorama/cepillado.jpeg', text: 'Cerrar la llave mientras te cepillas' },
      { img: 'assets/memorama/basura.jpeg', text: 'No tirar basura al agua' },
      { img: 'assets/memorama/detergente.jpeg', text: 'Usar detergente biodegradable' },
      { img: 'assets/memorama/gotera.jpeg', text: 'Reparar las goteras' },
      { img: 'assets/memorama/lavado_auto.jpeg', text: 'Lavar el auto con cubeta' },
      { img: 'assets/memorama/regado_plantas.jpeg', text: 'Regar las plantas por la noche' },
    ];
    // Aleatorizar los iconos
    iconos.sort(() => Math.random() - 0.5);
    this.iconos = iconos.slice(0, numberOfPairs); // Guardar iconos
    return this.iconos;
  }

  generarTablero() {
    const iconosCargados = this.cargarIconos(6);
    console.log(iconosCargados)
    this.tarjetas = [];

    iconosCargados.forEach((icono) => {
      this.tarjetas.push({ imgSrc: icono.img, text: '', flipped: false, isMatched: false });
      this.tarjetas.push({ imgSrc: '', text: icono.text, flipped: false, isMatched: false });
    });

    this.tarjetas = this.tarjetas.sort(() => Math.random() - 0.5);
  }

  revelarTarjetasInicialmente() {
    let delay = 0;
    this.tarjetas.forEach((tarjeta, index) => {
      setTimeout(() => {
        tarjeta.flipped = true;
        this.playSound(this.sonidoHoja);
      }, delay);
      setTimeout(() => {
        tarjeta.flipped = false;
        if (index === this.tarjetas.length - 1) {
          this.mostrarTarjetas = true;
        }
      }, delay + 1000);
      delay += 300;
    });
  }

  seleccionarTarjeta(index: number) {
    if (!this.mostrarTarjetas) return;

    const tarjeta = this.tarjetas[index];
    if (tarjeta.flipped || tarjeta.isMatched) return;

    tarjeta.flipped = true;
    this.playSound(this.sonidoHoja);
    this.selecciones.push(index);

    if (this.selecciones.length === 2) {
      this.verificarEmparejamiento();
      this.movimientos++;
    }
  }

  verificarEmparejamiento() {
    const [index1, index2] = this.selecciones;
    const tarjeta1 = this.tarjetas[index1];
    const tarjeta2 = this.tarjetas[index2];

    if (
      (tarjeta1.imgSrc && tarjeta2.text && tarjeta2.text === this.obtenerTextoRelacionado(tarjeta1.imgSrc)) ||
      (tarjeta2.imgSrc && tarjeta1.text && tarjeta1.text === this.obtenerTextoRelacionado(tarjeta2.imgSrc))
    ) {
      
      tarjeta1.isMatched = true;
      tarjeta2.isMatched = true;
      this.playSound(this.sonidoCorrecto);
      this.verificarSiJuegoTerminado();
    } else {
      setTimeout(() => {
        this.playSound(this.sonidoIncorrecto);
      }, 500);
      setTimeout(() => {
        tarjeta1.flipped = false;
        tarjeta2.flipped = false;
      }, 1000);
    }

    this.selecciones = [];
  }


  obtenerTextoRelacionado(imgSrc: string): string {
    const icono = this.iconos.find((icon) => icon.img === imgSrc);
    return icono ? icono.text : '';
}

  verificarSiJuegoTerminado() {
    if (this.tarjetas.every((tarjeta) => tarjeta.isMatched)) {
      this.gameFinished = true;
      this.movimientos++;
      this.tiempo++;
      this.puntajeTotal = Math.max(
        1000 + (5000 / (this.movimientos + 1)) + (3000 / (this.tiempo + 1)),
        100
      );
      
      this.mostrarResultados();
    }
  }

  mostrarResultados(gF: boolean = true, pT: number = 0) {
    this.gameFinished = gF;
    this.puntajeTotal = pT;
    if(!this.gameFinished)
      return;
    // Esperar 1 segundo antes de mostrar los resultados
    this.timeout = setTimeout(() => {
      for (let i = 0; i < this.resultadosCadena.length; i++) {
        this.timeout = setTimeout(() => {
          this.playSound(this.tecla);
          this.resultados += this.resultadosCadena[i];
        }, 200 * i);
      }
    
      this.timeout = setTimeout(() => {
        this.mostrarPuntuacion();
      }, 3000);
    }, 500);
  }

  mostrarPuntuacion() {
    if(!this.gameFinished)
      return;

    // puntajeTotal tiene la puntaucion. Ir sumando de 0 hasta puntajeTotal y reproducir sonido
    let i = 0;
    const step = Math.max(1, Math.floor(this.puntajeTotal / 50));
    this.timeout = setInterval(() => {
      if (i <= this.puntajeTotal) {
      this.playSound(this.tecla);
      this.puntajeTotalMensaje = i;
      i += step;
      } else {
      this.puntajeTotalMensaje = this.puntajeTotal;
      clearInterval(this.timeout);
      }
    }, 50);

    const timeout1 = setTimeout(() => {
      this.puntajeTotal > 600 ? this.playSound(this.sonidoVictoria) : this.playSound(this.sonidoDerrota);
    }, this.puntajeTotal * 3 + 500);
    
    const timeout2 = setTimeout(() => {
      console.log('Mostrar mensaje final');
      this.mostrarMensajeFinal();
    }, this.puntajeTotal * 3 + 2000);
  }

  mostrarMensajeFinal() {
    let mensajeFinal = '';
    if (this.puntajeTotal >= 1000) {
      mensajeFinal = '¡Increíble!';
    } else if (this.puntajeTotal >= 800) {
      mensajeFinal = '¡Excelente!';
    } else if (this.puntajeTotal >= 600) {
      mensajeFinal = '¡Bien hecho!';
    } else {
      mensajeFinal = '¡Sigue intentando!';
    }
    console.log(mensajeFinal);
    // Mostrar el mensaje final letra por letra
    for (let i = 0; i < mensajeFinal.length; i++) {
      this.timeout = setTimeout(() => {
        this.mensajeFinal += mensajeFinal[i];
      }, 50 * i);
    }

    // Mostrar el botón de reinicio después de terminar el mensaje
    this.timeout = setTimeout(() => {
      this.mostrarBotonReiniciar = true;
    }, mensajeFinal.length * 50 + 500);
  }

  reiniciarJuego() {
    // Limpia todos los intervalos y tiempos pendientes
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    clearTimeout(this.timeout);

    // Reinicia variables del juego
    this.countdownFinished = false;
    this.countdown = 3;
    this.gameFinished = false;
    this.mensajeFinal = '';
    this.resultados = '';
    this.puntuacion = '';
    this.movimientos = 0;
    this.tiempo = 0;

    this.playSound(this.sonidoPop);
    this.startGame();
  }

  playSound(soundPath: string) {
    const audio = new Audio(soundPath);
    audio.play();
  }

  ngOnDestroy() {
    this.gameFinished = true;
    // Limpia intervalos y tiempos al destruir el componente
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    clearTimeout(this.timeout);
  }
}
