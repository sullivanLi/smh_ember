import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var fb_id = sessionStorage.getItem('fb_id');
    return this.store.query('event', { fb_id: fb_id });
  },
  actions: {
    delete_event_record(event_id) {
      Ember.$('#error-msg').hide();
      var $route = this;
      var fb_id = sessionStorage.getItem('fb_id');
      Ember.$.ajax({
        url: 'http://localhost:9292/events/'+event_id,
        type: 'DELETE',
        data: { fb_id: fb_id },
        complete: function (data) {
          if(data.status === 200) {
            Ember.$("#deleteModal").modal('hide');
            $route.refresh();
          } else {
            Ember.$('#error-msg').text('some errors occurred');
            Ember.$('#error-msg').fadeIn();
          }
        }
      });
    }
  }
});
