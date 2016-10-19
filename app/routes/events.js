import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var fb_id = sessionStorage.getItem('fb_id');
    return this.store.query('event', { fb_id: fb_id });
  }
});
