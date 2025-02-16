import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  mapFormErrorMessages(errors: ValidationErrors | null): string | undefined {
    let errorMessage: string | undefined;
    if (errors) {
      errorMessage = Object.keys(errors)
        .map((key) => {
          switch (key) {
            case 'required':
              return 'Este campo es requerido.';
            case 'email':
              return 'Formato de correo inválido.';
            case 'minlength':
              return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
            case 'maxlength':
              return `Este campo no puede tener más de ${errors['maxlength'].requiredLength} caracteres.`;
            default:
              return '';
          }
        })
        .join(' ');
    }

    return errorMessage;
  }
}
