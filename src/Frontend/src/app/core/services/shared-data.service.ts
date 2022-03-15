import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { GenerateDocxService } from '../services/generate-docx.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private data = new BehaviorSubject<Object>({});
  currentData = this.data.asObservable();

  constructor(private generateDocxService: GenerateDocxService) {}

  addToData(data: Object) {
    this.currentData.pipe(first()).subscribe((oldData) => {
      this.data.next({ ...oldData, ...data });
    });
  }

  prepareForDocx() {
    this.currentData.pipe(first()).subscribe((data: any) => {
      const docxData = {
        ...data,
        date_created: getCurrentDate(),
      };
      console.log(docxData);
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
