import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import { Car } from '../../models/car';
import { NgIf, UpperCasePipe, NgFor} from '@angular/common';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  @Input() car?: Car;
  @Output() carUpdate = new EventEmitter<Car>();
  
  carForm = new FormGroup({
    id: new FormControl({ value: '', disabled: false }),
    mark: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    parts: new FormControl<string[]>([]),
  });
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.car) {
      this.carForm.patchValue({
        id: this.car.id,
        mark: this.car.mark,
        model: this.car.model,
        year: this.car.year.toString(),
        parts: this.car.parts,
      });
    }
  }
  
  sendUpdatedCarDetails() {
    if (this.carForm.valid) {
      const updatedCar: Car = {
        id: this.car?.id || '',
        mark: this.carForm.get('mark')?.value || '',
        model: this.carForm.get('model')?.value || '',
        year: Number(this.carForm.get('year')?.value) || 0,
        parts: [...(this.car?.parts || [])], ...(this.carForm.get('parts')?.value || []),
      };

      this.carUpdate.emit(updatedCar);
      this.carForm.reset();
    }
  }
}
