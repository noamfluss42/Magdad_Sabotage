import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { ButtonField, DatePickerField, DropdownField, TextboxField } from '../utils/fields';
import { FormFieldBase } from '../utils/form-field-base';
import { Exhibit, TableColumn } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ExhibitsService {
  exhibitsURL = `${Constants.API_URL}/exhibits`;
  public exhibit_number: string;

  constructor(private http: HttpClient, private router: Router) {
    this.exhibit_number = '';
  }

  /* GET: get exhibit by bag_number from the server */
  getExhibit(exhibit_number: string) {
    console.log(exhibit_number);
    return this.http.get(`${this.exhibitsURL}/${exhibit_number}`, {
      responseType: 'json',
    });
  }

  /* PUT: edit exhibit by bag_number on the server */
  editExhibit(exhibit: Exhibit) {
    console.log(exhibit);
    return this.http.put<Exhibit>(`${this.exhibitsURL}/${exhibit.exhibit_number}`,
      exhibit,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }

    );
  }

  /* POST: add new exhibit to the server */
  postExhibit(exhibit: Exhibit) {
    console.log(exhibit);
    return this.http.post<any>(this.exhibitsURL, exhibit, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    });
  }

  // getCaseExhibits(internal_number: string) {
  //   return this.http.get<any>(`${this.exhibitsURL}/query/{exhibit_number}`, {
  //     responseType: 'json',
  //   });
  // }

  getExhibitsFromCase(case_internal_number: string) {
    return this.http.get<Exhibit>(`${Constants.API_URL}/get_exhibits_query/${case_internal_number}`, {
      responseType: 'json',
    });
  }



  getQuestions() {
    const questions: FormFieldBase<string>[] = [
      new TextboxField({
        key: 'internal_number', // +year
        label: '???????? ??????',
        required: true,
        type: 'text',
        // value:OpenCaseFieldsService.getQuestions().key['internalNumber'], //! impleament method to get case id from open case service to exhibit register.
      }),
      new TextboxField({
        key: 'location',
        label: '??????????',
        required: true,
        type: 'text',
      }),
      new TextboxField({
        key: 'description', // +year
        label: '?????????? ??????????',
        required: false,
        type: 'text',
      }),

      new TextboxField({
        key: 'amount',
        label: '????????',
        required: false,
        type: 'text',
      }),
      new TextboxField({
        key: 'destination',
        label: '??????????',
        required: false,
        type: 'text',
      }),
      new DropdownField({
        key:'explosive',
        label:'????"??',
        required: false,
        options: [
          { key: "yes", value: "????" },
          { key: "no", value: "????" },
        ]
      }),
      new TextboxField({
        key:'explosive_weight',
        label:'???????? ????"??',
        required:false,
        type:'text',
      }),
      new DropdownField({
        key:"tnt_equivalent",
        label:"?????? ???????? ??????",
        required:false,
        options: [
          { key: "RDX", value: "RDX" },
          { key: "TNT", value: "TNT" },
          { key: "COMP-B", value: "COMP-B" },
          { key: "HMX", value: "HMX" },
          { key: "SMTEX", value: "??????????" },
          { key: "Tn", value: "????" },
          { key: "TATP", value: "TATP" },
          { key: "Nitroglycerin", value: "?????????? ????????????????" },
          { key: "spear", value: "????????" },
          { key: "ANFO", value: "ANFO" },
          { key: "C-4", value: "C-4" },
          { key: "A-5", value: "A-5" },
          { key: "Octol", value: "????????????" },
          { key: "Urea-nitrate", value: "???????????? ????????????" },
          { key: "Data-sailing", value: "?????? ??????" },
          { key: "Mercury-roars", value: "?????????? ??????????" },
          { key: "A-5", value: "A-5" },
          { key: "A-3", value: "A-3" },
          { key: "VH-10", value: "VH-10" },
          { key: "PX", value: "PX" },
          { key: "Nitrocellulose", value: "??????????????????????" },
        ]
      }),
      new DatePickerField({
        key:"received_date",
        label:"?????????? ??????????",
        required:false,
      }),
      new DatePickerField({
        key:"handle_date",
        label:"?????????? ??????????",
        required:false,
      }),
      new TextboxField({
        key:"result",
        label:"???????????? ??????????",
        required:false,
        type:'text',
      }),
      new TextboxField({
        key:"investigator_name",
        label:"???? ????????",
        required:false,
        type:'text',
      }),
      new DropdownField({
        key:"lab_name",
        label:"??????????",
        required:false,
        type:'text',
        options: [
          { key: '????????', value: '????????' },
          { key: '???? ????????', value: '??"??' },
          { key: '????????', value: '????????' },
          { key: '??????"??', value: '??????"??' },
        ],
      }),

      //new ButtonField({
      //  key: 'test',
      //  label: '?????????? ????????????',
      //  required: true,
      //  type: 'button',
      //}),


      new ButtonField({
        key: 'sample_navigation',
        label: '?????????? ????????????',
        type: 'button',
        onClick: (exhibit:Exhibit) => {
          console.log(exhibit);

          // local storage exhibit
          //localStorage.setItem("exhibit",JSON.stringify(exhibit));
          //alert("end edit internal number "+JSON.parse(localStorage.getItem('exhibit') || '{}').exhibit_number)
          this.router.navigate(['/sampleNavigator']);

      }}),

    ];
    return questions;
  }

  // return the columns that will be displayed in the dynamic table
  // name --> what will be displayed in the table
  // attribute --> the attribute of exhibit that will be returned.
  // sortable --> if the column is sortable ( for now doesn't work, might be replaced later with sort function)
  // TODO: add sort when I come back from Italy
  getTableColumns(): TableColumn[] {
    return [
      {
        name: '???????? ',
        // setting attribute to index to get the index of the exhibit in the array
        attribute: 'index',
        sortable: true,
        // set value to index
      },
      {
        name: "????' ??????????",
        attribute: 'internal_number',
        sortable: true,
      },
      {
        name: "????' ????????",
        attribute: 'exhibit_number',
        sortable: true,
      },
      {
        name: '?????????? ??????????',
        attribute: 'location',
        sortable: true,
      },
      {
        name: '??????????',
        attribute: 'description',
        sortable: true,
      },
      {
        name: '????????',
        attribute: 'amount',
        sortable: true,
      },
      {
        name: '??????????',
        attribute: 'destination',
        sortable: true,
      },
      {
        name: '????"??',
        attribute: 'explosive',
        sortable: true,
      },
      {
        name: '???????? ????"??',
        attribute: 'explosive_weight',
        sortable: true,
      },
      {
        name: 'TNT???????????????? ??',
        attribute: 'tnt_equivalent',
        sortable: true,
      },
      {
        name: '???????????? ??????????',
        attribute: 'received_date',
        sortable: true,
      },
      {
        name: '?????????? ??????????',
        attribute: 'handled_date',
        sortable: true,
      },
      {
        name: '???? ????????',
        attribute: 'investigator_name',
        sortable: true,
      },
      {
        name: '?????????? ??????????',
        attribute: 'lab_name',
        sortable: true,
      },
      {
        name: '???????????? ??????????',
        attribute: 'results',
        sortable: true,
      },
      {
        name: '??????????',
        attribute: '??????????',
        sortable: true,
        onClick: (exhibit: Exhibit) => {
          console.log(exhibit);
          // local storage exhibit
          localStorage.setItem("exhibit",JSON.stringify(exhibit));
          //localStorage.removeItem("case");
          this.router.navigate(['/editExhibit']);
        },
      },

    ];
  }
}
