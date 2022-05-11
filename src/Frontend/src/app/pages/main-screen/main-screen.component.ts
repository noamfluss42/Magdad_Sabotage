import { Component, OnInit } from '@angular/core';
import { DownloadExhibitsService } from 'src/app/core/services/download-exhibits.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  constructor(private service: DownloadExhibitsService) { }

  ngOnInit(): void {
  }

  downloadExhibits() {
    this.service.downloadExhibits()
  }

}
