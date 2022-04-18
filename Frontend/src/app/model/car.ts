import { User } from "./user";
import { CarType } from "./car-type";

export class Car {
  constructor(
    public id: number = 0,
    public price: number = 0,
    public type: CarType,
    public pickUpDate?: Date,
    public reservedOrBoughtBy?: User,
  ) {}
}
