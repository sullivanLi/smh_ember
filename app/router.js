import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('event', { path: '/event/:event_id' });
  this.route('time', { path: '/event/:event_id/time' });
});

export default Router;
