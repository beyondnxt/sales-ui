import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private fb: FormBuilder) { }
  @Output() searchData = new EventEmitter();
  @Input() placeholder: string = 'Search...'; 
  search = this.fb.group({
    keyWord: [''],
  })
}
