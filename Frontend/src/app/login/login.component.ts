import { Component } from '@angular/core';
import { HttpService } from "../http.service";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true;
  username: string = "";
  password: string = "";

  constructor(private http: HttpService, public shared: SharedService) {
  }

  login() {
    this.http.login(this.username, this.password).subscribe({
      next: data => {
        this.shared.activeUser = data;
        this.shared.navTo("overview");
      },
      error: e => {
        if (e.status === 401 || e.status === 404)
          alert("Ungültige Anmeldedaten!");
      }
    });
  }
}
