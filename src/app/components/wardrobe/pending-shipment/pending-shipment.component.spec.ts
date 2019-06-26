import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingShipmentComponent } from './pending-shipment.component';

describe('PendingShipmentComponent', () => {
  let component: PendingShipmentComponent;
  let fixture: ComponentFixture<PendingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
