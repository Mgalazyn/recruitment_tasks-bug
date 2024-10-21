import { Injectable } from '@angular/core';
import { CARS } from '../models/mock-cars';
import { Car } from '../models/car';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor() { }

  getCars(): Observable<Car[]> {
    const cars = of(CARS);
    return cars;
  }
}
