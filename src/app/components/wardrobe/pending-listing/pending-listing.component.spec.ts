import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingListingComponent } from './pending-listing.component';

describe('PendingListingComponent', () => {
  let component: PendingListingComponent;
  let fixture: ComponentFixture<PendingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
