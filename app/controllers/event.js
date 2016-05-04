import Ember from 'ember';

export default Ember.Controller.extend({
  username: null,
  actions: {
    add_person(time_id, checked) {
      var url, type;
      url = 'http://localhost:9292/times/' + time_id + '/person';
      if(checked) {
        type = 'POST';
      } else {
        type = 'DELETE';
      }
      Ember.$.ajax({
        url: url,
        type: type,
        data: { person_name: this.username },
        complete: function (data) {
          console.log(data);
        } 
      });
    },
    set_user_name(name) {
      this.username = name;
    }
  }
});
