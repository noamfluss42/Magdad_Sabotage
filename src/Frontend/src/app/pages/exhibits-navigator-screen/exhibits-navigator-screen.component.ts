import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibits-navigator-screen',
  templateUrl: './exhibits-navigator-screen.component.html',
  styleUrls: ['./exhibits-navigator-screen.component.css']
})
export class ExhibitsNavigatorScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('screen','/exhibitNavigator');
  }

}
