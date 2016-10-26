import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    Ember.$('.button-checkbox').each(function () {
      updateDisplay(this);
    });
  },
  actions: {
    click_checkbox(e) {
      var span = e.target.parentElement;
      while (span.nodeName !== 'SPAN') {
        span = span.parentElement;
      }
      var $checkbox = Ember.$(span).find('input:checkbox');

      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      updateDisplay(span);
    }
  }
});

function updateDisplay(span) {
  var $span = Ember.$(span);
  var $button = $span.find('button');
  var $checkbox = $span.find('input:checkbox');
  var isChecked = $checkbox.is(':checked');
  if (isChecked) {
    $button.removeClass('btn-default').addClass('btn-success'); 
    $button.find('.state-icon').removeClass()
           .addClass('state-icon glyphicon glyphicon-check');
    $button.find('span').text("I'm ok");
  } else {
    $button.removeClass('btn-success').addClass('btn-default');
    $button.find('.state-icon').removeClass()
           .addClass('state-icon glyphicon glyphicon-unchecked');
    $button.find('span').text("I can't");
  }
}
