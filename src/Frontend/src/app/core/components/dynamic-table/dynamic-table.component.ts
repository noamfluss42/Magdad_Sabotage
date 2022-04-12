import { Component, Input, OnInit } from '@angular/core';
import type { TableColumn } from '../../utils/types';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit {
  @Input() columns!: TableColumn[];
  @Input() tableData!: any[];
  // this variable is needed for displaying the collumns, was taken from the documentation
  public columnsToDisplay: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.columnsToDisplay = this.columns.map((column) => column.name);
  }
}
