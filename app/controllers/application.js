import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    FB.getLoginStatus(function(response) {
      if(response.status === 'connected'){
        display_after_login();
        auth.get_user_info();
      }else{
        display_after_logout();
      }
    });
  },
  actions: {
    fb_login() {
      FB.login(function(response) {
        if(response.status === 'connected') {
          auth.get_user_info();
          display_after_login();
        }
      });
    },
    fb_logout() {
      var $controller = this;
      FB.logout(function() {
        display_after_logout();
        sessionStorage.setItem('fb_id', '');
        sessionStorage.setItem('fb_name', '');
        sessionStorage.setItem('person_id', '');
        $controller.transitionToRoute('index');
      });
    },
    visit_event(event_id) {
      this.transitionToRoute('event', event_id);
    }
  }
});

var Auth = Ember.Object.extend({
  get_user_info: function() {
    let $ember = this;
    FB.api('/me', 'GET', {fields: 'name'}, function(response) {
      sessionStorage.setItem('fb_id', response.id);
      sessionStorage.setItem('fb_name', response.name);
      let person_id = sessionStorage.getItem('person_id');
      if(person_id === null || person_id === ''){
        $ember.sync_user_info();
      }
    });
  },
  sync_user_info: function() {
    var fb_id = sessionStorage.getItem('fb_id');
    var name = sessionStorage.getItem('fb_name');
    Ember.$.ajax({
      url: 'http://localhost:9292/people/fb',
      type: 'POST',
      data: { name: name, fb_id: fb_id },
      complete: function (data) {
        if(data.status === 200){
          var json_data =  Ember.$.parseJSON(data['responseText']);
          sessionStorage.setItem('person_id', json_data.id)
        }
      }
    });
  }
});
var auth = Auth.create();

function display_after_login() {
  Ember.run.schedule("afterRender",this,function() {
    Ember.$('#login-btn').addClass('hidden');
    Ember.$('#logout-btn').removeClass('hidden');
    Ember.$('#new-btn').removeClass('hidden');
    Ember.$('#events-btn').removeClass('hidden');
  });
}

function display_after_logout() {
  Ember.run.schedule("afterRender",this,function() {
    Ember.$('#login-btn').removeClass('hidden');
    Ember.$('#logout-btn').addClass('hidden');
    Ember.$('#new-btn').addClass('hidden');
    Ember.$('#events-btn').addClass('hidden');
  });
}
