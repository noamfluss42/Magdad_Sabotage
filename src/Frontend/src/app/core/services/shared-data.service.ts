import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { GenerateDocxService } from '../services/generate-docx.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  /*
  This class is used to share data between all components in this application.
  */

  private data = new BehaviorSubject<Object>({});
  currentData = this.data.asObservable();

  constructor(private generateDocxService: GenerateDocxService) {}

  //adds data to the shared data object, the parameter must be an object.
  addToData(data: Object) {
    this.currentData.pipe(first()).subscribe((oldData) => {
      this.data.next({ ...oldData, ...data });
    });
  }

  // adds the missing field in order to generate the docx file, and calls the downloadDocx method.
  prepareForDocx() {
    this.currentData.pipe(first()).subscribe((data: any) => {
      const docxData = {
        ...data,
        hazards: data.hazards.join(','),
        date_created: getCurrentDate(),
      };
      this.generateDocxService.downloadDocx(docxData);
    });
  }
}

function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
