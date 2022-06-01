import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  constructor(private router: Router) {


  }

  //if a user is on page for longer than 5 seconds, navigate to the last page he was on
  //find the last page he was on and navigate to it

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.router.navigate([localStorage.getItem('screen') || '/']);

    }, 500);
  }


  ngOnInit(): void {

  }


}
