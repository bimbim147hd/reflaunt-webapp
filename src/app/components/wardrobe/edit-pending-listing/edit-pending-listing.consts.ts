declare const $: any;

const prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
export const getTrackPriceStyle = (el, payload) => {
  const curVal = el.value;
  const range =
    100 /
    (estimatePrice(payload.item.original_price).max_price -
      estimatePrice(payload.item.original_price).min_price);
  const val =
    (curVal - estimatePrice(payload.item.original_price).min_price) * range;
  let style = '';
  // Set active label
  $('.price-edit .range-labels li').removeClass('active selected');

  const curLabel = $('.price-edit .range-labels').find(
    'li:nth-child(' + curVal + ')'
  );

  curLabel.addClass('active selected');
  curLabel.prevAll().addClass('selected');
  // Change background gradient
  for (let i = 0; i < prefs.length; i++) {
    style +=
      '.price-edit .range {background: linear-gradient(to right, #91c45e 0%, #91c45e ' +
      val +
      '%, #fff ' +
      val +
      '%, #fff 100%)}';
    style +=
      '.price-edit .range input::-' +
      prefs[i] +
      '{background: linear-gradient(to right, #91c45e 0%, #91c45e ' +
      val +
      '%, #e2e2e2 ' +
      val +
      '%, #e2e2e2 100%)}';
  }

  return style;
};

export const getTrackConditionStyle = function(el) {
  const curVal = el.value;
  const val = (curVal - 1) * 24.666666667;
  let style = '';

  // Set active label
  $('.condition-edit .range-labels li').removeClass('active selected');

  const curLabel = $('.condition-edit .range-labels').find(
    'li:nth-child(' + curVal + ')'
  );

  curLabel.addClass('active selected');
  curLabel.prevAll().addClass('selected');
  // Change background gradient
  for (let i = 0; i < prefs.length; i++) {
    style +=
      '.condition-edit .range {background: linear-gradient(to right, #91c45e 0%, #91c45e ' +
      val +
      '%, #fff ' +
      val +
      '%, #fff 100%)}';
    style +=
      '.condition-edit .range input::-' +
      prefs[i] +
      '{background: linear-gradient(to right, #91c45e 0%, #91c45e ' +
      val +
      '%, #e2e2e2 ' +
      val +
      '%, #e2e2e2 100%)}';
  }
  return style;
};

export const estimatePrice = original_price => {
  return {
    min_price: Math.round(original_price * 0.7),
    max_price: Math.round(original_price * 1.3)
  };
};
