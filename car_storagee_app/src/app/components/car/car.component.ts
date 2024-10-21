import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { CarDetailsComponent } from "../car-details/car-details.component";
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe, CarDetailsComponent],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit{
  cars: Car[] = [];

  selectedCar?: Car;

  constructor(
    private CarService: CarService
  ) {}

  onSelect(car: Car): void {
    this.selectedCar = car;
  }
  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.CarService.getCars().subscribe((cars) => (this.cars = cars));
  }

  updateCarData(updateCar: Car) {
    if (this.selectedCar) {
      const index = this.cars.findIndex((e) => e.id === this.selectedCar?.id);
      if (index !== -1) {
        this.cars[index] = updateCar;
      }
    }
  }
}
