import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-loader',
  templateUrl: './table-loader.component.html',
  styleUrls: ['./table-loader.component.scss']
})
export class TableLoaderComponent {
  @Input() valueColumns: number = 15;
  @Input() columns: number = 1; // Number of columns in the table

  // Generate an array with the specified length
  getArrayWithLength(length: number): any[] {
    return new Array(length);
  }

  // Method to generate array for header lines
  skeletonHeadersLines(): any[] {
    return this.getArrayWithLength(this.columns);
  }

  // Method to generate array for value lines (10 rows)
  skeletonValueLines(): any[] {
    return this.getArrayWithLength(this.valueColumns);
  }
}
