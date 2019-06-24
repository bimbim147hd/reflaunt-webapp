import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { GET_PRODUCT_DETAIL_REQUESTED } from '../detail/detail.actions';
declare const $: any;

@Component({
  selector: 'app-pending-listing',
  templateUrl: './pending-listing.component.html',
  styleUrls: ['./pending-listing.component.scss']
})
export class PendingListingComponent extends BaseComponent implements OnInit, AfterViewChecked {
  public reducer: String = 'Wardrobe.detail';
  constructor(private route: ActivatedRoute) {
    super();
    window.scroll(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({
      type: GET_PRODUCT_DETAIL_REQUESTED,
      data: { id: productId },
      com: 'PENDING_LISTING_COM'
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

    // Change input value on label click
    $('.range-labels li').on('click', function() {
      const index = $(this).index();
      $rangeInput.val(index + 1).trigger('input');
    });
    $rangeInput.val(Number($rangeInput.val())).trigger('input');
  }

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
