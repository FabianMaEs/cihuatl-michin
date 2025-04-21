import { Component } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { AlertService } from '../alert.service';
import { log } from '../logger';
import { BlogPreview, Blog, Author, Tag } from './blog.interface';


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MarkdownModule, LottieComponent],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss',],
})
export class BlogsComponent {
  

  options: AnimationOptions = {
    path: '/assets/icons/icons8-me-gusta.json',
    renderer: 'svg',
    loop: true,
    autoplay: false,
  };

  private animationItem!: AnimationItem;
  private playDuration = 700; // Milisegundos antes de detenerse

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  toggleAnimation(): void {
    if (!this.animationItem) return;
    
    this.animationItem.play();

    // Detener la animación después de 'playDuration' milisegundos
    setTimeout(() => {
      if (this.animationItem) {
        this.animationItem.pause();
        this.playDuration === 700 ? this.playDuration = 350 : this.playDuration = 700; 
      }
      if (this.playDuration === 700) {
        this.animationItem.goToAndStop(0, true); // Reiniciar la animación
      }
    }, this.playDuration);
  }

  infoTagsObtenida = false;
  infoAutoresObtenida = false;
  infoBlogObtenida = false;
  likedBlog = false; // Variable para controlar el like
  view = 'todos'; // Variable para controlar el switch
  specificSearch = false; // Variable para controlar el switch
  searchArray: string[] = []; // Variable para controlar el input de búsqueda
  blogs: BlogPreview[] = []; // Lista de blogs
  todosLosBlogs: BlogPreview[] = []; // Lista de blogs originales
  blogsCopy: BlogPreview[] = []; // Copia de los blogs para restaurar después de filtrar
  autores: Author[] = []; // Cambiado a Author[]
  tags: Tag[] = [];
  blogSeleccionado: Blog | null = null;
  markdown = '';
  errorMessagePred = 'Ha ocurrido un error al cargar los datos... Intenta de nuevo en un momento';
  errorMessage = this.errorMessagePred;
  buscar() {
    throw new Error('Method not implemented.');
  }

  mostrarTodos() {
    this.view = 'todos';
    if (this.blogs.length == 0) {
      this.infoBlogObtenida = false;
      this.blogService.getBlogsPreview()
        .then(data => {
          this.blogs = data;
          this.infoBlogObtenida = true;
        })
        .catch(() => {
          this.blogs = [];
          this.infoBlogObtenida = true; // Manejo de error
        });
    }
  }

  mostrarAutores() {
    this.view = 'autores';
    if (this.autores.length == 0) {
      this.infoAutoresObtenida = false;
      this.blogService.getAuthors()
        .then(data => {
          this.autores = data;
          this.infoAutoresObtenida = true;
          log('Autores obtenidos: ', this.autores);
        })
        .catch(() => {
          this.autores = [];
          this.infoAutoresObtenida = true; // Manejo de error
        });
    }
  }

  mostrarTags() {
    this.view = 'tags';
    if (this.tags.length == 0) {
      this.infoTagsObtenida = false;
      this.blogService.getTags()
      .then(data => {
        this.tags = data;
        this.infoTagsObtenida = true;
        log('Tags obtenidos: ', this.tags);
      })
      .catch(() => {
        this.tags = [];
        this.infoTagsObtenida = true; // Manejo de error
      });
    }
  }

  async mostrarBlog(id: string) {
    this.playDuration = 700; // Reiniciar la duración de la animación
    this.likedBlog = false;
    this.blogSeleccionado = null;
    this.view = 'detalle';
    this.blogSeleccionado = await this.blogService.getBlog(id);
    this.markdown = this.blogSeleccionado ? this.blogSeleccionado.content : '';
    log('Blog seleccionado: ', this.blogSeleccionado);
    const blogSeleccionado = this.blogSeleccionado;
    const blog = blogSeleccionado && blogSeleccionado._id 
      ? this.blogs.find(b => b._id === blogSeleccionado._id) 
      : null;
      
    if (blog) {
      blog.views = this.blogSeleccionado?.views ?? blog.views;
      blog.likes = this.blogSeleccionado?.likes ?? blog.likes;
    } else {
      this.eliminarFiltros();
    }
    
  }

  async like(id: string) {
    this.toggleAnimation()
    this.likedBlog = !this.likedBlog; // Cambia el estado del like
    try {
      this.blogSeleccionado = await this.blogService.like(id, this.likedBlog);
      const blog = this.blogSeleccionado ? this.blogs.find(b => b._id === this.blogSeleccionado?._id) ?? null : null;
      if (blog) {
        blog.likes = this.blogSeleccionado?.likes ?? blog.likes;
      }
    } catch (error) {
      this.alertService.error("Error al dar like al blog", "Error"); // Muestra un mensaje de error
    }
    const likeButton = document.getElementById('like');
    if (likeButton) {
      likeButton.setAttribute('disabled', 'true');
      likeButton.style.pointerEvents = 'none';

      setTimeout(() => {
        likeButton.removeAttribute('disabled');
        likeButton.style.pointerEvents = 'auto';
      }, 2000);
    }
  }

  blogs_filtered: BlogPreview[] = []

  filtrarBlogs() {
    log("Search: ", this.searchArray)
    log("Todos los blogs: ", this.todosLosBlogs)
    this.blogs_filtered = this.todosLosBlogs.filter(blog =>
      this.searchArray.every(filter =>
        blog.tags.includes(filter) || blog.author.name === filter
      )
    );
    log("Blogs filtrados: ", this.blogs_filtered)
    this.errorMessage = this.blogs_filtered.length === 0 ? 'No se encontraron blogs que coincidan con los filtros.' : this.blogs_filtered.toString();
    log("Filter: ",this.blogs_filtered)
    this.blogs = this.blogs_filtered;
  }
  
  mostrarEtiqueta(tag_id: string) {
    this.view = 'todos';
    this.specificSearch = true;
    if (!this.searchArray.includes(tag_id)) this.searchArray.push(tag_id);
    this.filtrarBlogs();
  }

  mostrarAutor(autor_id: string) {
    this.view = 'todos';
    this.specificSearch = true;
    if (!this.searchArray.includes(autor_id)) this.searchArray.push(autor_id);
    this.filtrarBlogs();
  }

  eliminarFiltros() {
    this.specificSearch = false;
    this.searchArray = [];
    this.blogs = this.todosLosBlogs;
    this.blogs_filtered = [];
    this.view = 'todos';
    this.errorMessage = this.errorMessagePred;
  }
  
  eliminarFiltro(filtro: string) {
    this.searchArray = this.searchArray.filter(f => f !== filtro);
    if (this.searchArray.length === 0) {
      this.eliminarFiltros();
    } else {
      this.filtrarBlogs();
    }
  }
  

  constructor(private blogService: BlogsService, private alertService: AlertService) { }

  ngOnInit() {
    this.infoBlogObtenida = false;
    if(this.blogs.length == 0) {
      this.blogService.getBlogsPreview()
        .then(data => {
          this.blogs = data;
          this.todosLosBlogs = data; // Guardar la lista original de blogs
          this.infoBlogObtenida = true;
          log('Blogs obtenidos: ', this.blogs);
        })
        .catch(() => {
          // console.error('Error al obtener blogs componente');
          this.blogs = [];
          this.infoBlogObtenida = true;
        });
    }
  }

}
