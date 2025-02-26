import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWcpmsComponent } from './ng-wcpms.component';

describe('NgWcpmsComponent', () => {
  let component: NgWcpmsComponent;
  let fixture: ComponentFixture<NgWcpmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgWcpmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWcpmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
