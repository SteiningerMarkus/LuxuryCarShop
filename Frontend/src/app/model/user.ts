import { CarType } from "./car-type";

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string,
    public pickedUpCars: CarType[],
  ) {}
}
