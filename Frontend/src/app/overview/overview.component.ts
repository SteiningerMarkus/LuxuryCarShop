import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared.service";
import { Car } from "../model/car";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  filterText: string = "";
  availableCars: Car[] = [];
  shownCars: Car[] = [];

  constructor(private http: HttpService, public shared: SharedService) { }

  ngOnInit(): void {
    this.http.getAvailableCars(this.shared.activeUser?.username).subscribe(data => {
      this.availableCars = data;
      this.updateShownCars();
    });
  }

  logInOrOut() {
    if (this.shared.activeUser == undefined)
      this.shared.navTo("login");
    else
      this.shared.activeUser = undefined;
  }

  updateShownCars() {
    this.shownCars = (this.filterText === ""
        ? this.availableCars.concat()
        : this.availableCars.filter(c => this.shared.getTitleString(c).toLowerCase().includes(this.filterText.toLowerCase()))
    ).sort((c1, c2) => this.shared.getTitleString(c1).localeCompare(this.shared.getTitleString(c2)));
  }
}
