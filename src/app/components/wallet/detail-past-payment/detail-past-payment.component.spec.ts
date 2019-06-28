import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPastPaymentComponent } from './detail-past-payment.component';

describe('DetailPastPaymentComponent', () => {
  let component: DetailPastPaymentComponent;
  let fixture: ComponentFixture<DetailPastPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPastPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPastPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
