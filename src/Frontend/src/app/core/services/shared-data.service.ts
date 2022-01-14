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
        labName: data['labName'],
        dateCreated: getCurrentDate(),
        phoneNumber: data['phoneNumber'],
        internalNumber: `${data['internalNumber']}/${data['internalNumberyear']}`,
        recipient: data['recipient'],
        urgency: data['urgency'],
        hazards: data['hazards'],
        exhibits: data['exhibits'],
        unit: data['InvestigatingUnit'],
        referenceType: data['referenceType'],
        referenceNumber: data['referenceNumber'],
        bagNumber: data['bagNumber'],
        exhibitDescription: data['exhibitDescription'],
        exhibitsPackaging: data['exhibitsPackaging'],
        exhibitsMark: data['exhibitsMark'],
        eventDescription: data['eventDescription'],
        testingEssence: data['testingEssence'],
        notes: data['notes'],
        senderName: data['senderName'],
        senderRank: data['senderRank'],
        senderSerialNumber: data['senderSerialNumber'],
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
