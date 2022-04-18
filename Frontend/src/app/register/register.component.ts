import { Component } from '@angular/core';
import { SharedService } from "../shared.service";
import { User } from "../model/user";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = new User();
  hidePassword: boolean = true;
  password2: string = "";

  constructor(private http: HttpService, public shared: SharedService) {
  }

  register() {
    if (this.user.password !== this.password2)
      alert("Die Passwörter stimmen nicht überein!")
    else
      this.http.register(this.user).subscribe({
        next: _ => {
          this.shared.activeUser = this.user;
          this.shared.navTo("overview");
        },
        error: e => {
          if (e.status === 403)
            alert("Benutzername ist bereits in Verwendung!");
        }
      });
  }
}
