import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true;
  username: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpService) { }

  login() {
    this.http.login(this.username, this.password).subscribe({
        next: _ => this.router.navigate(["overview"]),
        error: e => {
          if (e.status == 401 || e.status == 404)
            alert("Invalid username/password!");
        }
      });
  }
}
