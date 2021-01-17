import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent  {

  constructor(public authService: AuthService) { }
}
