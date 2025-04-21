import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(message: string, title = 'Éxito') {
    Swal.fire(title, message, 'success');
  }

  error(message: string, title = 'Error') {
    Swal.fire(title, message, 'error');
  }

  info(message: string, title = 'Información') {
    Swal.fire(title, message, 'info');
  }

  warning(message: string, title = 'Advertencia') {
    Swal.fire(title, message, 'warning');
  }

  confirm(message: string, title = '¿Estás seguro?') {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  }
  
  toast(message: string, title = 'Éxito', icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
    Swal.fire({
      toast: true,
      position: 'top-start',
      showCloseButton: true,
      icon: icon,
      title,
      text: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  
}
