import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    FB.getLoginStatus(function(response) {
      if(response.status === 'connected'){
        FB.api('/me', 'GET', {fields: 'name'}, function(response) {
          sessionStorage.setItem('fb_id', response.id);
          sessionStorage.setItem('fb_name', response.name);
          Ember.$('#events-link').removeClass('hidden');
          Ember.$('#events-link').find('a').text(response.name);
        });
      }else{
        Ember.$('#login-btn').removeClass('hidden');
      }
    });
  },
  
  actions: {
    FBLogin() {
      FB.login(function(response) {
        console.log('login now');
      });
    }
  }
});
