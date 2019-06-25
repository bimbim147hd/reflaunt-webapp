import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPendingListingComponent } from './edit-pending-listing.component';

describe('EditPendingListingComponent', () => {
  let component: EditPendingListingComponent;
  let fixture: ComponentFixture<EditPendingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPendingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPendingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
