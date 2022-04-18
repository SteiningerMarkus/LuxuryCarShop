import { Injectable } from '@angular/core';
import { User } from "./model/user";
import { HttpClient } from "@angular/common/http";
import { Car } from "./model/car";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseurl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  public register(user: User) {
    return this.http.post(`${this.baseurl}/user/register`, user);
  }

  public login(username: string, password: string) {
    return this.http.post<User>(`${this.baseurl}/user/login`, { username: username, password: password });
  }

  public getAvailableCars(username?: string) {
    let url: string = `${this.baseurl}/cars/available`;

    if (username != null)
      url += `?username=${username}`;

    return this.http.get<Car[]>(url);
  }

  public reserveCar(username: string, carId: number) {
    console.log(`${this.baseurl}/cars/${carId}/reserve?username=${username}`);
    this.http.post(`${this.baseurl}/cars/${carId}/reserve?username=${username}`, {});
  }

  public unreserveCar(carId: number) {
    console.log("unreserve");
    this.http.post(`${this.baseurl}/cars/${carId}/unreserve`, null);
  }

  public pickUpCar(carId: number) {
    return this.http.post(`${this.baseurl}/cars/pickup?carId=${carId}`, null);
  }

  public buy(username: number, carId: number, pickupDate: Date) {
    return this.http.post(`${this.baseurl}/cars/buy?username=${username}&carId=${carId}&pickupDate=${pickupDate}`, null);
  }
}
