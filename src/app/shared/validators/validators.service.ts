import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {


  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public tokenPattern = /^[0-9]{8}$/;


  constructor() { }


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
