import { Component, OnInit } from '@angular/core';
import { SearchCaseService } from 'src/app/core/services/search-case.service';

@Component({
  selector: 'app-results-screen',
  templateUrl: './results-screen.component.html',
  styleUrls: ['./results-screen.component.css']
})
export class ResultsScreenComponent implements OnInit {

  constructor(private searchService:SearchCaseService) {

   }
  //gets data from the local storage and shows it in the results screen


  ngOnInit(): void {
  }

}
