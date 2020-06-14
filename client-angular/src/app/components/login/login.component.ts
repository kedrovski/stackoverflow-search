import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;  

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    // Save all StackApps data here
    localStorage.setItem('key', 'yFvfHUJ1HF6uSxD2JCdLqQ((');
    localStorage.setItem('redirect_uri', 'http://localhost:4200/search');
    localStorage.setItem('client_id', '17957');

    // this.authGuard.updateMessage(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // redirect to home if already logged in
    if (this.authService.userValue) { 
      this.router.navigate(['search/auth']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  login(email, password) {
    this.authService.login(email, password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['search/auth']);
                },
                error => {
                    console.error(error);
                });
  }

}
