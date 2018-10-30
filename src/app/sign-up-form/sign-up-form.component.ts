import { Component } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {

  submitted = false;

  model = new User("rhoroff@ufl.edu", "password", "Ryan", "Horoff");

  onSubmit() { this.submitted = true};

  get diagnostic() { return JSON.stringify(this.model)}
  

}
