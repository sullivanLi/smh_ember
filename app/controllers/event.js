import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    Ember.run.later(this, (function() {
      Ember.$(':checkbox').checkboxpicker();
    }), 200);
  },
  username: null,
  actions: {
    add_person(time_id) {
      var checked = Ember.$('#checkbox'+time_id)[0].checked;
      var url, type;
      url = 'http://localhost:9292/times/' + time_id + '/person';
      if(!checked) {
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
      Ember.run.later(this, (function() {
        this.send('refresh_page');
      }), 1500);
    },

    set_user_name(model, name) {
      init_checkbox(model, name);
      this.username = name;
    }
  }
});

function init_checkbox(model, name){
  var times = model.get('times');
  times.forEach(function(time){
    var people = time.get('people');
    var checked = false;
    people.forEach(function(person){
      if(person.get('name') === name){
        Ember.$('#'+time.id).checkbox('check');
        checked = true;
      }
      if(!checked){
        Ember.$('#'+time.id).checkbox('uncheck');
      }
    });
  });
}
