import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCancelBtnComponent } from './sales-cancel-btn.component';

describe('SalesCancelBtnComponent', () => {
  let component: SalesCancelBtnComponent;
  let fixture: ComponentFixture<SalesCancelBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesCancelBtnComponent]
    });
    fixture = TestBed.createComponent(SalesCancelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
