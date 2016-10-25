import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    Ember.run.schedule("afterRender",this,function() {
      var $controller = this;
      Ember.$("#confirmDelete").on( "click", function() {
        var event_id = Ember.$(this).data("eventid");
        $controller.send('delete_event_record', event_id);
      });
    });
  },
  actions: {
    delete_event(event) {
      Ember.$("#confirmDelete").data("eventid", event.id);
      Ember.$("#eventName").text(event.get("name"));
      Ember.$('#delete-error-msg').hide();
      Ember.$("#deleteModal").modal('show');
    }
  }
});
