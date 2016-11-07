import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    let person_id = sessionStorage.getItem('person_id');
    if(person_id === null || person_id === ''){
      Ember.$('.c-section').removeClass('hidden');
    } else {
      Ember.$('.c-section').addClass('hidden');
    }
  },
  actions: {
    login() {
      this.sendAction('login');
    },
    login_test() {
      console.log('this is test!');
    }
  }
});
