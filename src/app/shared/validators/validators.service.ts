import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {


  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  constructor() { }


  isFieldOneEqualValidateTwo(field1: string, field2:string){

        return ( formGroup: AbstractControl ): ValidationErrors | null => {

            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if(fieldValue1 !== fieldValue2){
                //*Aqui establecemos en el INPUT el error ya que con q un input tenga un error
                //*todo el formulario se marcara como error:
                formGroup.get(field2)?.setErrors({notEqual: true});

                //*Esto es el error del formulario:
                return {notEqual: true}
            }
            
            formGroup.get(field2)?.setErrors(null);
            return null;
        }

  }


  isAdult(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();

    const age = today.getFullYear() - inputDate.getFullYear();
    const hasHadBirthday =
      today.getMonth() > inputDate.getMonth() ||
      (today.getMonth() === inputDate.getMonth() && today.getDate() >= inputDate.getDate());

    const realAge = hasHadBirthday ? age : age - 1;

    return realAge >= 18 ? null : { notAdult: true };
  }


  



  isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }


}
