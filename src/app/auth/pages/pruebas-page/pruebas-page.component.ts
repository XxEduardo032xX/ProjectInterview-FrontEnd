import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';

@Component({
  selector: 'app-pruebas-page',
  templateUrl: './pruebas-page.component.html',
  styleUrl: './pruebas-page.component.css'
})
export class PruebasPageComponent implements OnInit{


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    lastName: ['', [Validators.required, Validators.minLength(3)], []],
    selectValue: ['DNI', [Validators.required], []],
    documentoNumero: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsServices.emailPattern)], []],
    agePerson: ['', [Validators.required, this.validatorsServices.isAdult], []]
  })


  constructor(private fb: FormBuilder, private validatorsServices: ValidatorsService){}
  
  ngOnInit(): void {

    this.myForm.get('selectValue')?.valueChanges.subscribe(tipo => {
    const control = this.myForm.get('documentoNumero');

    if (tipo === 'DNI') {
      control?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{8}$/) //* Exactamente 8 dígitos
      ]);
    } 
    else if (tipo === 'CE') {
      control?.setValidators([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{9}$/) //* Ejemplo: alfanumérico 9 caracteres
      ]);
    } 
    else {
      control?.clearValidators();
    }

      control?.updateValueAndValidity();
    });
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



  onSave(){
    
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return  
    };

  }



}
