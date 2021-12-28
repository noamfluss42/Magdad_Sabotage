import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private data = new BehaviorSubject<Object>({});
  currentData = this.data.asObservable();

  constructor() {}

  addToData(data: Object) {
    this.currentData.pipe(first()).subscribe((oldData) => {
      this.data.next({ ...oldData, ...data });
    });
  }

  prepareForDocx() {
    let data;
    console.log(
      this.currentData.pipe(first()).subscribe((res) => (data = res))
    );
    console.log(data);
  }
}
