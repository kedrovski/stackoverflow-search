import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.user.subscribe(x => this.user = x);
  }

  get isAuth() {
      return this.user && this.user.token;
  }

  ngOnInit() {}

  logOut() {
    this.authService.logout();
  }

}
