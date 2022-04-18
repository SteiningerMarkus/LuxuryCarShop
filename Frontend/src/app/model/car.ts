import { User } from "./user";
import { CarType } from "./car-type";

export class Car {
  constructor(
    public id: number,
    public price: number,
    public pickUpDate: Date,
    public reservedOrBoughtBy: User,
    public type: CarType,
  ) {}
}
