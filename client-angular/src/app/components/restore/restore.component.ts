import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {
  restoreForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.restoreForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.restoreForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.restoreForm.invalid) {
        return;
    }
    this.apiService.restore(this.restoreForm.value.email).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        Swal.fire(
          'Successfully!',
          'Email with new password was sent successfully!',
          'success'
        ).then(()=> {
          this.router.navigate(['']);
        });
      } else {
        alert(data.msg);
      }
    });
  }

}
