import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from "../../model/car";
import { SharedService } from "../../shared.service";
import { HttpService } from "../../http.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {
  @Input()
  car!: Car;

  constructor(private http: HttpService, public shared: SharedService) { }

  toggleReserve() {
    if (this.car.reservedOrBoughtBy == undefined)
      this.http.reserveCar(this.shared.activeUser!.username, this.car.id);
    else
      this.http.unreserveCar(this.car.id);
  }

  buy() {

  }

  pickup() {

  }
}
