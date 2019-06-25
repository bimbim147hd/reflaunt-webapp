import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute } from '@angular/router';
import { GET_PRODUCT_DETAIL_REQUESTED } from '../detail/detail.actions';
declare const $: any;
import * as _ from 'lodash';
import {
  getTrackPriceStyle,
  getTrackConditionStyle,
  estimatePrice
} from './edit-pending-listing.consts';

@Component({
  selector: 'app-edit-pending-listing',
  templateUrl: './edit-pending-listing.component.html',
  styleUrls: ['./edit-pending-listing.component.scss']
})
export class EditPendingListingComponent extends BaseComponent
  implements OnInit, AfterViewChecked, OnDestroy, AfterViewInit {
  public reducer: String = 'Wardrobe.detail';
  public productId;
  public uploading = {
    process: false,
    error: false
  };
  public checkSingsWear = true;
  public estimatePrice = estimatePrice;
  public new_sign;
  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    super();
    window.scroll(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    this.productId = productId;
    this.store.dispatch({
      type: GET_PRODUCT_DETAIL_REQUESTED,
      data: { id: productId },
      com: 'EDIT_PENDING_LISTING_COM'
    });
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    const $this = this;
    const sheetPrice = document.createElement('style'),
      $rangePriceInput = $('.price-edit .range input');
    document.body.appendChild(sheetPrice);
    $rangePriceInput.on('input', function() {
      sheetPrice.textContent = getTrackPriceStyle(this, $this.payload);
    });

    $rangePriceInput.val(Number($rangePriceInput.val())).trigger('input');

    const sheetCondition = document.createElement('style'),
      $rangeConditionInput = $('.condition-edit .range input#conditions');
    document.body.appendChild(sheetCondition);

    $rangeConditionInput.on('input', function() {
      sheetCondition.textContent = getTrackConditionStyle(this);
    });

    $('.condition-edit .range-labels li').on('click', function() {
      const index = $(this).index();
      $rangeConditionInput.val(index + 1).trigger('input');
    });

    $rangeConditionInput
      .val(Number($rangeConditionInput.val()))
      .trigger('input');
  }

  completeUpload($event) {
    const $this = this;
    if (!_.isEmpty($event.response.data)) {
      _.forEach($event.response.data, function(image) {
        $this.store
          .getState()
          .Wardrobe.detail.item.images.push(image.full_path);
      });
    }
  }

  errorUploadAvatar($event) {
    console.log('error', $event);
  }

  priceChange(value) {
    this.payload.item.price.price = value;
  }

  getConditionDescription(condition) {
    let result = 'Not found';
    Object.keys(this.payload.item.condition_description_items).forEach(key => {
      if (condition === key) {
        result = this.payload.item.condition_description_items[key];
      }
    });
    return result;
  }

  displaySigns(val) {
    $('.btn-signs').removeClass('focus');
    if (val === 'yes') {
      $('#signs-yes').addClass('focus');
      this.checkSingsWear = true;
    }
    if (val === 'no') {
      $('#signs-no').addClass('focus');
      this.checkSingsWear = false;
    }
  }

  signSelected(item) {
    _.map(this.payload.item.signs_of_wear, i => {
      if (i.title === item.title) {
        i.checked = !item.checked;
      }
      return i;
    });
  }

  addSign(val) {
    if (val) {
      this.payload.item.signs_of_wear = [
        ...this.payload.item.signs_of_wear,
        { title: val, checked: true }
      ];
      this.new_sign = undefined;
    }
  }

  publishListing() {
    console.log(this.payload.item);
  }

  ngOnDestroy() {}

  mapStateToProps(state) {
    return {
      payload: state.Wardrobe.detail
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
