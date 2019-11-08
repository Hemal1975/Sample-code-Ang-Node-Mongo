import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  onSignUp(form: NgForm) {
    console.log(form);
    if(form.invalid){
      return;
    } else {
      this.isLoading = true;
      this.authService.createUser(form.value.email, form.value.password);
    }
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
