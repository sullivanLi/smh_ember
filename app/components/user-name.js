import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
   Ember.$('.modal').modal({
      inverted: true
    }).modal('setting', 'closable', false).modal('show');
  },
  actions: {
    set_user_name(name) {
      if(name === '') {
        Ember.$('.ui.error').text('Your name cannot be blink!');
        Ember.$('.ui.error').transition('jiggle');
      }else {
        this.sendAction('onComplete', name); 
        Ember.$('.modal').modal('hide');
      }
    }
  }
});
