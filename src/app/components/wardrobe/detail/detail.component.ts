import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GET_PRODUCT_DETAIL_REQUESTED } from './detail.actions';
import { BaseComponent } from '../../base.component';
declare const $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  public reducer: String = 'Wardrobe.detail';
  constructor(private route: ActivatedRoute) {
    super();
    window.scroll(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({
      type: GET_PRODUCT_DETAIL_REQUESTED,
      data: { id: productId }
    });
  }

  ngOnInit() {
    this.init();
  }
  ngAfterViewInit() {}
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
