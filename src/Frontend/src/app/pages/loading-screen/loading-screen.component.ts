import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  constructor() { 

  }

  //if a user is on page for longer than 5 seconds, navigate to the last page he was on
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.location.href = '/searchCaseResult';
    }, 2000);
  }


  ngOnInit(): void {

  }
  

}
