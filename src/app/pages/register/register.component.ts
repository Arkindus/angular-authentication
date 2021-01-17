import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  onRegister() {
    const inputEmail: string = this.registerForm.get('email').value;
    const inputPassword: string = this.registerForm.get('password').value;
    const inputConfirmPassword: string = this.registerForm.get('confirmPassword').value;
    if(inputPassword === inputConfirmPassword) {
      this.authService.signUp(inputEmail, inputConfirmPassword);
    } else {
      this.registerForm.get('password').setValue('');
      this.registerForm.get('confirmPassword').setValue('');
      window.alert('Password mismatch!, renter your passwords!');
    }
  }
}
