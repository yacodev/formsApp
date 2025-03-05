import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => setTimeout(() => resolve(true), 2000));
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].invalid &&
      (formArray.controls[index].dirty || formArray.controls[index].touched)
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'este campo es requerido ';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `valor mínimo de ${errors['min'].min}`;
        case 'email':
          return 'el valor ingresado no es un correo electronico';
        case 'emailTaken':
          return 'el correo electronico ya esta en uso';

        case 'noStrider':
          return 'El nombre de usuario no puede ser strider';
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'el correo electronico no es valido';
          }
          return ' El campo no cumple con el patrón requerido de correo electronico';
        default:
          return `error no controlado ${key}`;
      }
    }
    return null;
  }

  static samePasswords(password: string, password2: string) {
    return (formGroup: AbstractControl) => {
      const field1value = formGroup.get(password)?.value;
      const field2value = formGroup.get(password2)?.value;

      return field1value === field2value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }
    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    if (formValue === 'strider') {
      return { noStrider: true };
    }
    return null;
  }
}
