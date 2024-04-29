import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLoaderComponent } from './table-loader.component';

describe('TableLoaderComponent', () => {
  let component: TableLoaderComponent;
  let fixture: ComponentFixture<TableLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableLoaderComponent]
    });
    fixture = TestBed.createComponent(TableLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
