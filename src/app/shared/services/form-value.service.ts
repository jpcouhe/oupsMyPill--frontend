import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComplexFormValue } from '../models/form-value.model';

@Injectable({
  providedIn: 'root'
})
export class FormValueService {


_formValue$= new BehaviorSubject<ComplexFormValue[]>([])
get value$(): Observable<ComplexFormValue[]>{
  return this._formValue$.asObservable()
}
  constructor() { 
  }
}
