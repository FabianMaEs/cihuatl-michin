import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms ease-in'),
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    // Animación para el contador
    trigger('fade', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('500ms ease-out'),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
    // Animación para las preguntas
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('staggerResults', [
      transition(':enter', [
        query(':self', style({ opacity: 0, transform: 'translateY(20px)' }), {
          optional: true,
        }),
        query(
          ':self',
          [
            stagger(300, [
              animate(
                '600ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('botonReiniciar', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class QuizComponent implements OnInit {
  questionsDict = [
    {
      question:
        '¿Cómo se llama el grupo que cuida los ríos y lagos en Aguascalientes?',
      options: ['Cihuatl Michin', 'Amigos del agua', 'Defensores del planeta'],
      correct: 0,
    },
    {
      question: '¿Qué hacen en el colectivo Cihuatl Michin?',
      options: [
        'Juegan en el campo',
        'Cuidan los cuerpos de agua y animales',
        'Plantan árboles solo en el bosque',
      ],
      correct: 1,
    },
    {
      question: '¿En qué parte de Aguascalientes hay más montañas y árboles?',
      options: ['En el centro', 'En el oeste', 'En el suroeste'],
      correct: 1,
    },
    {
      question: '¿Por qué son importantes los ríos y lagos?',
      options: [
        'Para tener agua limpia y ayudar a los animales',
        'Solo para que podamos nadar',
        'Porque son bonitos',
      ],
      correct: 0,
    },
    {
      question: '¿Qué plantas viven en el estado de Aguascalientes?',
      options: [
        'Árboles de navidad',
        'Plantas secas y cactus',
        'Plantas tropicales como palmeras',
      ],
      correct: 1,
    },
    {
      question: '¿Qué río es importante en Aguascalientes?',
      options: ['Río de las aguas cristalinas', 'Río Calvillo', 'Río Grande'],
      correct: 1,
    },
    {
      question: '¿Qué podemos hacer para cuidar los cuerpos de agua?',
      options: [
        'Tirar basura cerca de ellos',
        'No tirar basura y mantenerlos limpios',
        'Nadar todo el día en ellos',
      ],
      correct: 1,
    },
    {
      question: '¿Qué animal vive en los ríos de Aguascalientes?',
      options: ['Tortuga Casquito', 'León', 'Elefante'],
      correct: 0,
    },
    {
      question: '¿Cuál es una planta que vive en los lagos de Aguascalientes?',
      options: ['Flor de loto', 'Rosa', 'Girasol'],
      correct: 0,
    },
    {
      question:
        '¿Por qué debemos proteger a los animales y plantas en Aguascalientes?',
      options: [
        'Porque los necesitamos para vivir',
        'Porque son bonitos',
        'Porque no hay otros lugares donde vivir',
      ],
      correct: 0,
    },
    {
      question: '¿Qué podemos hacer para ayudar al medio ambiente?',
      options: [
        'Tirar plásticos al río',
        'Reciclar y no usar mucho plástico',
        'Romper ramas de los árboles',
      ],
      correct: 1,
    },
    {
      question: '¿Qué significa cuidar el agua?',
      options: [
        'Tener más agua para jugar',
        'No desperdiciar agua y mantenerla limpia',
        'Tomarla todo el tiempo',
      ],
      correct: 1,
    },
    {
      question: '¿Por qué es importante aprender sobre los ecosistemas?',
      options: [
        'Para cuidar la naturaleza y los animales',
        'Solo para estudiar en la escuela',
        'Para hacer más comida',
      ],
      correct: 0,
    },
  ];

  questions: any;

  currentQuestionIndex = 0;
  score = 0;
  timer = 30;
  interval: any;
  timeout: any;
  quizOver = false;
  countdownFinished = false;
  mostrarBotonReiniciar = false;
  selectedAnswer: number | null = null;
  countdown: number | null = 3;

  sonidoCorrecto = 'assets/quiz/sonidos/correcto.mp3';
  sonidoIncorrecto = 'assets/quiz/sonidos/incorrecto.mp3';
  sonidoVictoria = 'assets/quiz/sonidos/victoria.mp3';
  sonidoDerrota = 'assets/quiz/sonidos/derrota.mp3';
  sonidoWoosh = 'assets/quiz/sonidos/woosh.mp3';
  sonidoIniciarTimer = 'assets/quiz/sonidos/beeps.mp3';
  tecla = 'assets/quiz/sonidos/tecla.mp3';
  pop = 'assets/quiz/sonidos/pop.mp3';
  timerSound = new Audio('assets/quiz/sonidos/timer.mp3');

  // Mensaje aleatorio de "¡YA!", "¡LISTO!", "¡VAMOS!", etc.
  yaMensaje = ['¡YA!', '¡LISTO!', '¡VAMOS!', '¡ADELANTE!', '¡EMPEZAMOS!'][
    Math.floor(Math.random() * 5)
  ];
  resultadosCadena = 'RESULTADOS';
  resultados = '';
  puntuacionCadena = 'Tu puntuación es ';
  puntuacion = '';
  mensajeFinal = '';

  // Variables para el fondo y efectos
  backgroundState: 'correct' | 'incorrect' | 'neutral' = 'neutral';

  ngOnInit() {
    // Esperar 1 segundo
    this.timeout = setTimeout(() => {}, 1000);
    // Elegir 8 preguntas aleatorias
    this.questions = this.questionsDict
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    // Esperar 3 segundos antes de iniciar el quiz
    this.startQuiz();
  }

  startQuiz() {
    this.playSound(this.sonidoIniciarTimer);
    const interval = setInterval(() => {
      if (this.countdown !== null) {
        this.countdown--;
      }
      if (this.countdown !== null && this.countdown < 0) {
        // Un segundo después de que termine la cuenta regresiva
        this.timeout = setTimeout(() => {
          this.countdown = null;
        }, 1000);

        clearInterval(interval);
        this.countdownFinished = true;

        // Muestra las preguntas después de una breve pausa
        this.timeout = setTimeout(() => {
          this.startTimer();
        }, 500); // Espera que termine la animación de salida
      }
    }, 1000);
  }

  startTimer() {
    this.timer = 30;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 5) {
        // Reproducir sonido de cuenta atrás
        this.timerSound.play();
      }
      if (this.timer === 0) {
        clearInterval(this.interval);

        this.backgroundState = 'incorrect';
        this.timerSound.pause();
        this.playSound(this.sonidoIncorrecto);
        this.nextQuestion(false);
      }
    }, 1000);
  }

  selectAnswer(index: number) {
    if (this.selectedAnswer !== null) {
      return; // Si ya se ha seleccionado una respuesta, no hace nada
    }

    this.selectedAnswer = index;
    clearInterval(this.interval);

    if (index === this.questions[this.currentQuestionIndex].correct) {
      this.score++;
      this.backgroundState = 'correct';
      // Reproducir sonido de correcto
      this.playSound(this.sonidoCorrecto);
    } else {
      this.backgroundState = 'incorrect';
      // Reproducir sonido de incorrecto
      this.playSound(this.sonidoIncorrecto);
    }

    this.timeout = setTimeout(() => {
      this.nextQuestion(
        index === this.questions[this.currentQuestionIndex].correct
      );
    }, 1000);
  }

  nextQuestion(correct: boolean) {
    this.playSound(this.sonidoWoosh);
    this.selectedAnswer = null;
    this.backgroundState = 'neutral'; // Resetear fondo
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizOver = true;
      clearInterval(this.interval);
      this.puntuacionCadena += `${this.score} de ${this.questions.length}`;
      this.mostrarResultados();
    } else {
      this.startTimer();
    }
  }

  mostrarResultados() {
    for (let i = 0; i < this.resultadosCadena.length; i++) {
      this.timeout = setTimeout(() => {
        this.playSound(this.tecla);
        this.resultados += this.resultadosCadena[i];
      }, 200 * i);
    }

    this.timeout = setTimeout(() => {
      this.mostrarPuntuacion();
    }, 3000);
  }

  mostrarPuntuacion() {
    for (let i = 0; i < this.puntuacionCadena.length; i++) {
      this.timeout = setTimeout(() => {
        this.playSound(this.tecla);
        this.puntuacion += this.puntuacionCadena[i];
      }, 75 * i);
    }

    this.timeout = setTimeout(() => {
      this.playSound(
        this.score >= 5 ? this.sonidoVictoria : this.sonidoDerrota
      );
    }, this.puntuacionCadena.length * 100 - 500);

    this.timeout = setTimeout(() => {
      this.mostrarMensajeFinal();
    }, this.puntuacionCadena.length * 100 + 500);
  }

  mostrarMensajeFinal() {
    let mensajeFinal = '';
    if (this.score >= 5) {
      mensajeFinal = '¡Felicidades!';
    } else {
      mensajeFinal = '¡Sigue intentando!';
    }

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

  restartQuiz() {
    this.mostrarBotonReiniciar = false;
    this.playSound(this.pop);
    this.puntuacionCadena = 'Tu puntuación es ';
    this.resultados = '';
    this.puntuacion = '';
    this.mensajeFinal = '';
    this.countdownFinished = false;
    this.countdown = 3;
    this.quizOver = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.backgroundState = 'neutral';

    //this.startTimer();
    this.timeout = setTimeout(() => {
      this.startQuiz();
    }, 1000);
  }

  playSound(soundPath: string) {
    const sound = new Audio(soundPath);
    sound.play();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.timerSound.pause();
    this.timerSound.currentTime = 0;
  }
}
