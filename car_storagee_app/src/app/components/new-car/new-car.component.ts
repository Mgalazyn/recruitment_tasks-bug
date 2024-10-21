import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CARS } from '../../models/mock-cars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-car.component.html',
  styleUrl: './new-car.component.css'
})
export class NewCarComponent {
  @Input() car?: Car;
  isFormVisible = false;

  carForm = new FormGroup({
    mark: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    parts: new FormControl(''),
  });

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(): void{
    if (this.carForm.valid) {
      const newCar: Car = {
        id: uuidv4(),
        mark: this.carForm.value.mark!,
        model: this.carForm.value.model!,
        year: Number(this.carForm.value.year!),
        parts: this.carForm.value.parts!.split(',').map(part => part.trim()),
      };
      
      CARS.push(newCar);
      this.carForm.reset();
      this.isFormVisible = false;
    }
  }
}
