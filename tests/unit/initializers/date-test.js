import Ember from 'ember';
import DateInitializer from 'smh-ember/initializers/date';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | date', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  DateInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
