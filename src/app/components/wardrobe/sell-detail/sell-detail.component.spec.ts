import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellDetailComponent } from './sell-detail.component';

describe('SellDetailComponent', () => {
  let component: SellDetailComponent;
  let fixture: ComponentFixture<SellDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
