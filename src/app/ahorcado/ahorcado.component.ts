import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {
  frases: string[] = [
    'ANGULAR ES DIVERTIDO',
    'PROGRAMAR ES UN ARTE',
    'EL FUTURO ES HOY',
    'APRENDER ES CRECER',
    'DESAFIOS NOS HACEN MEJORES'
  ];

  sonidoCorrecto = './../../assets/memorama/sonidos/correcto.mp3';
  sonidoIncorrecto = './../../assets/memorama/sonidos/incorrecto.mp3';
  sonidoPop = './../../assets/quiz/sonidos/pop.mp3';
  sonidoVictoria = './../../assets/quiz/sonidos/victoria.mp3';
  sonidoDerrota = './../../assets/quiz/sonidos/derrota.mp3';

  fraseOriginal: string = '';
  fraseOculta: string[] = [];
  abecedario: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letrasUsadas: string[] = [];
  errores: number = 0;
  barraProgreso: number = 100;
  juegoTerminado: boolean = false;
  victoria: boolean = false;

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.fraseOriginal = this.frases[Math.floor(Math.random() * this.frases.length)];
    this.fraseOculta = this.fraseOriginal.split('').map((letra) =>
      letra === ' ' ? ' ' : '_'
    );
    this.letrasUsadas = [];
    this.errores = 0;
    this.barraProgreso = 100;
    this.juegoTerminado = false;
    this.victoria = false;
  }

  adivinarLetra(letra: string) {
    this.letrasUsadas.push(letra);

    if (this.fraseOriginal.includes(letra)) {
      this.playSound(this.sonidoCorrecto);
      this.descubrirLetra(letra);
      if (this.fraseOculta.join('') === this.fraseOriginal) {
        this.playSound(this.sonidoVictoria);
        this.juegoTerminado = true;
        this.victoria = true;
      }
    } else {
      this.playSound(this.sonidoIncorrecto);
      this.errores++;
      this.barraProgreso = Math.max(0, 100 - (this.errores / 7) * 100);

      if (this.errores >= 7) {
        this.playSound(this.sonidoDerrota);
        this.juegoTerminado = true;
      }
    }
  }

  descubrirLetra(letra: string) {
    this.fraseOculta = this.fraseOculta.map((actual, index) =>
      this.fraseOriginal[index] === letra ? letra : actual
    );
  }

  playSound(sound: string) {
    const audio = new Audio(sound);
    audio.play();
  }

  reiniciarJuego() {
    this.iniciarJuego();
  }
}
