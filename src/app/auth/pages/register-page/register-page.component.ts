import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})


export class RegisterPageComponent implements OnInit{


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    lastName: ['', [Validators.required, Validators.minLength(3)], []],
    selectValue: ['DNI', [Validators.required], []],
    token: ['', [Validators.required, Validators.pattern(this.validatorsServices.tokenPattern)], []],
    documentoNumero: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsServices.emailPattern)], []],
    agePerson: ['', [Validators.required, this.validatorsServices.isAdult], []]
  })


  constructor(
    private fb: FormBuilder, 
    private validatorsServices: ValidatorsService,
    private authService: AuthService
  ){}
  
  value: string | undefined;
  bonoSeleccionado: number | null = 30;
  mostrarSegundoFormulario = false;


  ngOnInit(): void {
  const control = this.myForm.get('documentoNumero');

  this.myForm.get('selectValue')?.valueChanges.subscribe(tipo => {
    if (tipo === 'DNI') {
      control?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]);
    } else if (tipo === 'CE') {
      control?.setValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{9}$/)
      ]);
    } else {
      control?.clearValidators();
    }
    
    control?.updateValueAndValidity();
  });

    this.myForm.get('selectValue')?.setValue('DNI', { emitEvent: true });
  
  }



  isValidField(field: string){
    //*Obtener validacion de un servicio:
    return this.validatorsServices.isValidField(this.myForm, field);

  }

  getFieldError(field: string) {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'pattern':
          return 'Formato inválido';
        case 'notAdult':
          return 'Debes ser mayor de 18 años';
      }
    }

    return null;
  }



  //*Guardar la data del formulario si esta bien:
  onSave() {
  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }

  const token = this.myForm.get('token')?.value;

  this.authService.saveToken(token).subscribe({
    next: () => {
      this.authService.validateToken(token).subscribe({
        next: (resp) => {
          if (!resp.valido) {
            alert('Token inválido o ya fue usado');
            return;
          }

          const clienteData = {
            documento_tipo: this.myForm.get('selectValue')?.value,
            documento_numero: this.myForm.get('documentoNumero')?.value,
            nombres: this.myForm.get('name')?.value,
            apellidos: this.myForm.get('lastName')?.value,
            fecha_nacimiento: this.myForm.get('agePerson')?.value,
            bono_bienvenida: this.bonoSeleccionado,
            token: token,
            correo: this.myForm.get('email')?.value
          };

          this.authService.registerClient(clienteData).subscribe({
            next: (response) => {
              alert('Cliente registrado correctamente. ID: ' + response.id);
              // this.myForm.reset();
              this.myForm.reset({
                selectValue: 'DNI'
              });

              this.bonoSeleccionado = 30;
              this.mostrarSegundoFormulario = false;
            },
            error: (err) => {
              console.error('Error al registrar cliente:', err);
              alert('Ocurrió un error al registrar el cliente.');
            }
          });
        },
        error: () => alert('Error validando token')
      });
    },
    error: (err) => {
      if (err.status === 409) {
        alert('Este token ya ha sido registrado anteriormente.');
      } else {
        console.error('Error guardando token:', err);
        alert('Error inesperado al guardar el token');
      }
    }
  });
}




  seleccionarBono(numero: number): void {
    this.bonoSeleccionado = numero;
  }

  imprimir(): void {
    //*Chapa el bono
    if (this.bonoSeleccionado !== null) {
      //*Chapa el bono, una vez que chapa el bono generamos el token, luego de generarlo
      //*mostramos el token en el input correspondiente, luego de eso el usuario rellena el formulario
      //*envia los datos, luego de enviarlo se almacena en la base de datos
      console.log('Bono a recibir (S/):', this.bonoSeleccionado);

      this.authService.generateTokenOnly().subscribe({
        next: (resp) => {
          this.myForm.get('token')?.setValue(resp.token);
          this.mostrarSegundoFormulario = true;
      },
        error: (err) => {
          console.error('Error al generar token:', err);
      }   
    });

    
    } else {
      console.warn('No se ha seleccionado ningún bono');
    }
  }

}
