import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //name = 'Angular';
  title = 'app';
  professors = [
    {name: 'Keesling', courses: ['math', 'logic'], officeHours:['M,5','F,6'], futureCourses:['math', 'proofs', 'calculus'], research:['math theory']},
    {name: 'Small', courses: ['programming'], officeHours:['T, 6-8'], futureCourses:['programming', 'graphics', 'discrete'], research:['computer science'] }
  ];
  
}





