import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    FB.getLoginStatus(function(response) {
      if(response.status === 'connected'){
        display_after_login();
        get_fb_info();
      }else{
        display_after_logout();
      }
    });
  },
  
  actions: {
    fb_login() {
      FB.login(function(response) {
        if(response.status === 'connected') {
          get_fb_info();
          display_after_login();
          sync_user_info();
        }
      });
    },
    fb_logout() {
      var $controller = this;
      FB.logout(function() {
        display_after_logout();
        sessionStorage.setItem('fb_id', '');
        sessionStorage.setItem('fb_name', '');
        $controller.transitionToRoute('index');
      });
    },
    visit_event(event_id) {
      this.transitionToRoute('event', event_id);
    }
  }
});

function get_fb_info() {
  FB.api('/me', 'GET', {fields: 'name'}, function(response) {
    sessionStorage.setItem('fb_id', response.id);
    sessionStorage.setItem('fb_name', response.name);
  });
}

function sync_user_info() {
  var fb_id = sessionStorage.getItem('fb_id');
  var name = sessionStorage.getItem('fb_name');
  Ember.$.ajax({
    url: 'http://localhost:9292/people/fb',
    type: 'POST',
    data: { name: name, fb_id: fb_id }
  });
}

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
