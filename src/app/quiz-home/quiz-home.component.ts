import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { QuizComponent } from '../quiz/quiz.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.scss'],
  standalone: true,
  imports: [ QuizComponent, CommonModule],
  animations: [
    trigger('expandScreen', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('600ms ease-in-out', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate('600ms ease-in-out', style({ transform: 'scale(0)' })),
      ]),
    ]),
  ],
})
export class QuizHomeComponent implements OnInit {
  
  backgroundMusic: HTMLAudioElement | undefined;
  sonidoPop = './../../assets/quiz/sonidos/pop.mp3';

  ngOnInit(): void {
    // Inicializar música de fondo 4 segundos después de cargar la página con una transición suave
    setTimeout(() => {
      this.backgroundMusic = new Audio('./../../assets/quiz/musica/fondo2.mp3a');
      this.backgroundMusic.volume = 0.1;
      this.backgroundMusic.loop = true;
      this.backgroundMusic.play().catch((error) => {
        console.error('Error al reproducir música:', error);
      });
      this.backgroundMusic.volume = 0.2;
    }, 5500);
  }

  toggleMusic() {
    if (this.backgroundMusic?.paused) {
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic?.pause();
    }
  }

  quizStarted = false;
  mascotAnimationClassLeft = '';
  mascotAnimationClassRight = '';

  startMusic() {
    this.playSound(this.sonidoPop);
    // Reproducimos la música tras interacción
    this.backgroundMusic?.play().catch((error) => {
      console.error('Error al reproducir música:', error);
    });
    this.startQuiz();
  }

  startQuiz() {
    // Añadimos clases de animación
    this.mascotAnimationClassLeft = 'exit-left';
    this.mascotAnimationClassRight = 'exit-right';

    // Esperamos a que termine la animación para iniciar el quiz
    setTimeout(() => {
      this.quizStarted = true;
    }, 600); // Coincide con el tiempo de transición CSS
  }

  ngOnDestroy() {
    // Pausa la música y reinicia el tiempo si es necesario
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0; // Reinicia la música
    }
  }

  muteMusic() {
    if (this.backgroundMusic?.volume === 0.2) {
      this.backgroundMusic.volume = 0.1;
    }
    else if (this.backgroundMusic?.volume === 0.1) {
      this.backgroundMusic.volume = 0;
    }
    else {
      this.backgroundMusic!.volume = 0.2;
    }
  }
  
  playSound(soundPath: string) {
    const sound = new Audio(soundPath);
    sound.play();
  } 
  
}
