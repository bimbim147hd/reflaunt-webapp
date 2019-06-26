import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute } from '@angular/router';
import { default_conditions } from '../edit-pending-listing/edit-pending-listing.consts';
import { GET_PRODUCT_DETAIL_REQUESTED } from '../selling-detail/detail.actions';
import { EMAIL_ME_SHIPPING_LABEL_REQUESTED } from './pending-shipment.actions';
declare const $: any;

@Component({
  selector: 'app-pending-shipment',
  templateUrl: './pending-shipment.component.html',
  styleUrls: ['./pending-shipment.component.scss']
})
export class PendingShipmentComponent extends BaseComponent
  implements OnInit, AfterViewChecked {
  public reducer: String = 'Wardrobe.detail';
  public conditions = default_conditions;

  constructor(private route: ActivatedRoute) {
    super();
    window.scroll(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({
      type: GET_PRODUCT_DETAIL_REQUESTED,
      data: { id: productId },
      com: 'PENDING_SHIPMENT_COM'
    });
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewChecked() {
    const getTrackStyle = function(el) {
      const curVal = el.value;
      const val = (curVal - 1) * 24.666666667;
      let style = '';

      // Set active label
      $('.range-labels li').removeClass('active selected');

      const curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

      curLabel.addClass('active selected');
      curLabel.prevAll().addClass('selected');
      // Change background gradient
      for (let i = 0; i < prefs.length; i++) {
        style +=
          '.range {background: linear-gradient(to right, #91c45e 0%, #91c45e ' +
          val +
          '%, #fff ' +
          val +
          '%, #fff 100%)}';
        style +=
          '.range input::-' +
          prefs[i] +
          '{background: linear-gradient(to right, #91c45e 0%, #91c45e ' +
          val +
          '%, #e2e2e2 ' +
          val +
          '%, #e2e2e2 100%)}';
      }
      return style;
    };
    const sheet = document.createElement('style'),
      $rangeInput = $('.range input#conditions'),
      prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
    document.body.appendChild(sheet);

    $rangeInput.on('input', function() {
      sheet.textContent = getTrackStyle(this);
    });
    $rangeInput.val(Number($rangeInput.val())).trigger('input');
  }

  emailShippingLabel = () => {
    this.store.dispatch({
      type: EMAIL_ME_SHIPPING_LABEL_REQUESTED,
      data: {
        email: this.store.getState().Auth.login.profile.email,
        shipment_id: this.payload.item.shipments[0].shipment_id
      }
    });
  // tslint:disable-next-line:semicolon
  };

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
