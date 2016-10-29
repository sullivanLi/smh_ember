import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    refresh() {
      this.send('refresh_page');
    }
  }
});

