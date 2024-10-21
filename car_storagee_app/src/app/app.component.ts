import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from "./components/car-details/car-details.component";
import { NewCarComponent } from "./components/new-car/new-car.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarComponent, CarDetailsComponent, NewCarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'car_storagee_app';
}
