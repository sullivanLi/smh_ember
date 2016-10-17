import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    FB.getLoginStatus(function(response) {
      if(response.status === 'connected'){
        display_account();
        get_fb_info();
      }else{
        display_login_btn();
      }
    });
  },
  
  actions: {
    fb_login() {
      FB.login(function(response) {
        if(response.status === 'connected') {
          get_fb_info();
          display_account();
          sync_user_info();
        }
      });
    },
    fb_logout() {
      FB.logout(function() {
        display_login_btn();
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
    var account_text = Ember.$('#my-account > a').html();
    account_text = account_text.replace("My Account", response.name);
    Ember.$('#my-account > a').html(account_text);
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

function display_account() {
  Ember.run.schedule("afterRender",this,function() {
    Ember.$('#login-btn').addClass('hidden');
    Ember.$('#my-account').removeClass('hidden');
  });
}

function display_login_btn() {
  Ember.run.schedule("afterRender",this,function() {
    Ember.$('#login-btn').removeClass('hidden');
    Ember.$('#my-account').addClass('hidden');
  });
}
