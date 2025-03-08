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
    'CIHUATL MICHIN CUIDA EL AGUA',
    'LOS RIOS SON VITALES PARA LA VIDA',
    'EL AGUA ES UN TESORO QUE DEBEMOS CUIDAR',
    'LA BIODIVERSIDAD ES LA CLAVE PARA UN PLANETA SANO',
    'PRESERVAR EL MEDIO AMBIENTE ES UNA RESPONSABILIDAD',
    'EL AGUA ES EL HOGAR DE MUCHOS ANIMALES',
    'LA CONSERVACION DEL AGUA ES UNA PRIORIDAD',
    'LAS PLANTAS ACUATICAS MANTIENEN LOS ECOSISTEMAS SANOS',
    'CUIDAR LOS ECOSISTEMAS NOS BENEFICIA A TODOS',
    'LOS ECOSISTEMAS SON EL HOGAR DE LA BIODIVERSIDAD',
    'LA TORTUGA CASQUITO ES UNA ESPECIE VULNERABLE',
    'LAS ESPECIES INVASORAS AMENAZAN LA BIODIVERSIDAD',
    'UNIRNOS EN LA PROTECCION DEL AGUA HACE LA DIFERENCIA',
    'LOS BOSQUES MANTIENEN EL EQUILIBRIO ECOLOGICO',
    'REFORESTAR AYUDA A LOS ECOSISTEMAS A RECUPERARSE',
    'LA EDUCACION AMBIENTAL ES CLAVE PARA EL FUTURO',
    'EL CAMBIO CLIMATICO AFECTA A LOS ECOSISTEMAS LOCALES',
    'PROTEGER EL MEDIO AMBIENTE ES UN ACTO DE AMOR',
    'LA CONSERVACION DE LOS RIOS ES FUNDAMENTAL',
    'LA EDUCACION AMBIENTAL AYUDA A CONSERVAR EL AGUA',
    'LA BASURA EN LOS RIOS AFECTA A LA VIDA SILVESTRE',
    'LOS RIOS SON EL HOGAR DE MUCHAS ESPECIES',
    'LA CONTAMINACION DEL AGUA AFECTA A TODOS',
    'LAS ESPECIES NATIVAS SON PARTE DE NUESTRA IDENTIDAD',
    'LA CONSERVACION DE LOS RIOS ES UNA PRIORIDAD',
  ];
  

  sonidoCorrecto = 'assets/memorama/sonidos/correcto.mp3';
  sonidoIncorrecto = 'assets/memorama/sonidos/incorrecto.mp3';
  sonidoPop = 'assets/quiz/sonidos/pop.mp3';
  sonidoVictoria = 'assets/quiz/sonidos/victoria.mp3';
  sonidoDerrota = 'assets/quiz/sonidos/derrota.mp3';

  fraseOriginal = '';
  fraseOculta: string[] = [];
  abecedario: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letrasUsadas: string[] = [];
  errores = 7;
  barraProgreso = 0;
  juegoTerminado = false;
  victoria = false;

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.fraseOriginal = this.frases[Math.floor(Math.random() * this.frases.length)];
    this.fraseOculta = this.fraseOriginal.split('').map((letra) =>
      letra === ' ' ? ' ' : '_'
    );
    this.letrasUsadas = [];
    this.errores = 7;
    this.barraProgreso = 0;
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
      this.barraProgreso =
        (this.fraseOculta.filter((letra) => letra !== '_').length /
          this.fraseOriginal.length) *
        100;
    } else {
      this.playSound(this.sonidoIncorrecto);
      this.errores--;
      
      if (this.errores <= 0) {
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
