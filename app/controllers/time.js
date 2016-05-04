import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add_time(event_id) {
      var url = 'http://localhost:9292/events/' + event_id  + '/times';
      Ember.$.ajax({
        url: url,
        type: "POST",
        data: { time: this.get('time') },
        complete: function (data) {
          console.log(data);
        }
      });
    }
  }
});
