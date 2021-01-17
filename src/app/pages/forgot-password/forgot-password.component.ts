import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  passwordResetForm: FormGroup;
  constructor(public authService: AuthService) {
    this.passwordResetForm= new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }
}
