import Ember from 'ember';

export default Ember.Component.extend({
  time_id: undefined,
  people: [],
  didInsertElement: function() {
    let $span = Ember.$('#' + this.time_id);
    let person_id = sessionStorage.getItem('person_id');
    if(person_id === null || person_id === ''){
      $span.addClass('hidden');
    } else {
      this.people.forEach(function(person) {
        if(person.get('id') === person_id) {
          let $checkbox = $span.find('input:checkbox');
          $checkbox.prop('checked', !$checkbox.is(':checked'));
        }
      });
      updateDisplay($span);
    }
  },
  actions: {
    click_checkbox(e) {
      let span = e.target.parentElement;
      while (span.nodeName !== 'SPAN') {
        span = span.parentElement;
      }
      let $checkbox = Ember.$(span).find('input:checkbox');
      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      updateDisplay(span);
    },
    change_checkbox(e) {
      let isChecked = Ember.$(e.target).is(':checked');
      let url = 'http://localhost:9292/times/' + this.time_id + '/person';
      let type = isChecked ? 'POST' : 'DELETE';
      let fb_id = sessionStorage.getItem('fb_id');
      let $component = this;
      Ember.$.ajax({
        url: url,
        type: type,
        data: { fb_id: fb_id },
        complete: function () {
          $component.sendAction('onComplete');
        }
      });
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
