import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceConsoleComponent } from './attendence-console.component';

describe('AttendenceConsoleComponent', () => {
  let component: AttendenceConsoleComponent;
  let fixture: ComponentFixture<AttendenceConsoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendenceConsoleComponent]
    });
    fixture = TestBed.createComponent(AttendenceConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
