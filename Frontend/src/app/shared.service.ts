import { Injectable } from '@angular/core';
import { User } from "./model/user";
import { Router } from "@angular/router";
import { Car } from "./model/car";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private router: Router) { }

  public activeUser?: User;

  navTo(target: string) {
    this.router.navigate([target]);
  }

  getTitleString(car: Car) {
    return `${car.type.producer} ${car.type.model} (${car.type.color}) um € ${car.price}`;
  }
}
