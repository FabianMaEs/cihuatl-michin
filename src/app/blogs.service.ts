import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { log } from './logger';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  serverUrl = environment.serverUrl;

  constructor() {
    log('URL del servidor: ', this.serverUrl);
  }

  async getBlogsPreview() {
    log('Obteniendo blogs (service)...');
    const response = await fetch(this.serverUrl + '/blogs_preview');
    if (!response.ok) throw new Error('Error al obtener blogs service');
    return await response.json();
  }
  
  async getTags() {
    log('Obteniendo tags (service)...');
    const response = await fetch(this.serverUrl + '/tags');
    if (!response.ok) throw new Error('Error al obtener tags');
    return await response.json();
  }

  async getAuthors() {
    log('Obteniendo autores (service)...');
    const response = await fetch(this.serverUrl + '/authors');
    if (!response.ok) throw new Error('Error al obtener autores');
    return await response.json();
  }
  
  async getBlog(id: string) {
    log('Obteniendo blog (service)...');
    const response = await fetch(this.serverUrl + '/blog/' + id);
    if (!response.ok) throw new Error('Error al obtener blog');
    // log('Blog obtenido (service): ', await response.clone().json());
    return await response.json();
  }

  async getBlogsByAuthor(author_name: string) {
    log('Obteniendo blogs por autor (service)...');
    const response = await fetch(this.serverUrl + '/blogs/author/' + author_name);
    if (!response.ok) throw new Error('Error al obtener blogs por autor');
    log('Blogs obtenidos + autor (service): ', await response.clone().json());
    return await response.json();
  }

  async like(id: string, like: boolean = true) {
    log('Dando like (service)...');
    const response = await fetch(`${this.serverUrl}/like/${id}/${like}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al dar like');
    return await response.json();
  }

  async sendEmail(message: string, subject: string, email: string, name: string) {
    log('Enviando email (service)...');
    const response = await fetch(`${this.serverUrl}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, subject, email, name })
    });
    if (!response.ok) throw new Error('Error al enviar email');
    return await response.json();
  }
}
