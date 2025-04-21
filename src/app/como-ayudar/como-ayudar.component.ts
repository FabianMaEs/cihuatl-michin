import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';
import { log } from '../logger';

@Component({
  selector: 'app-como-ayudar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './como-ayudar.component.html',
  styleUrl: './como-ayudar.component.css'
})
export class ComoAyudarComponent {

  contactForm: FormGroup;
  maxSubjectLength = 60; // Número máximo de caracteres permitidos
  maxMessageLength = 200; // Número máximo de caracteres permitidos

  subjectRemainingCharacters: number = this.maxSubjectLength; // Número máximo de caracteres permitidos
  messageRemainingCharacters: number = this.maxMessageLength; // Número máximo de caracteres permitidos
  
  constructor(
    private route: ActivatedRoute, 
    private blogService: BlogsService, 
    private fb: FormBuilder,
    private alertService: AlertService  
  ) { 
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      subject: [''],
      name: ['']
    });
  }

  updateCharacterCount(event: Event, field: 'subject' | 'message') {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (field === 'subject') {
      this.subjectRemainingCharacters = this.maxSubjectLength - target.value.length;
    } else if (field === 'message') {
      this.messageRemainingCharacters = this.maxMessageLength - target.value.length;
    }
  }

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

  sendMessage(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (this.contactForm.valid) {
      let { message, subject, email, name } = this.contactForm.value;
  
      // Sanitización básica que reemplaza < y > por sus entidades HTML
      // y elimina espacios en blanco al principio y al final del mensaje
      const sanitize = (str: string) =>
        str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
  
      message = sanitize(message);
      subject = sanitize(subject || 'Asunto vacío');
      name = sanitize(name || 'Sin nombre');
      email = email.trim(); // Solo eliminamos espacios en este caso
      if(message.length === 0) {
        // this.alertService.warning("El mensaje no puede estar vacío", "Advertencia"); // Muestra un mensaje de advertencia
        this.alertService.toast("El mensaje no puede estar vacío", "Advertencia", "warning"); // Muestra un mensaje de advertencia
        return;
      }
      this.blogService.sendEmail(
        message,
        subject,
        email,
        name
      ).then(response => {
        log(response);
        this.alertService.success("El mensaje fue enviado. Te responderemos en breve.", "Mensaje enviado"); // Muestra un mensaje de éxito
        this.contactForm.reset(); // Limpia el formulario
        this.subjectRemainingCharacters = this.maxSubjectLength; // Reinicia el contador de caracteres
        this.messageRemainingCharacters = this.maxMessageLength; // Reinicia el contador de caracteres
      }).catch(error => {
        this.alertService.error("Error al enviar el mensaje. Intenta de nuevo más tarde.", "Error"); // Muestra un mensaje de error
      });
    } else {
      this.alertService.toast("Por favor, completa todos los campos requeridos", "Advertencia", "warning"); // Muestra un mensaje de advertencia
    }
  }
  

}