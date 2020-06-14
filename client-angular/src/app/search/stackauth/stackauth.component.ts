import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stackauth',
  templateUrl: './stackauth.component.html',
  styleUrls: ['./stackauth.component.scss']
})
export class StackauthComponent implements OnInit {
  isAuth = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('ACCESS_TOKEN_SO')) {
      let client_id = localStorage.getItem('client_id');
      let key = localStorage.getItem('key');
      let redirect_uri = localStorage.getItem('redirect_uri');

      window.open(`https://stackoverflow.com/oauth/dialog?client_id=${client_id}&key=${key}&scope=no_expiry&redirect_uri=${redirect_uri}`, '_self');
    } else {
      this.router.navigate(['search']);
    }
  }

}
