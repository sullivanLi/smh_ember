import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  times: DS.hasMany('time'),

  name_slice: Ember.computed('name', function() {
    var name = this.get('name');
    if (name.length > 25) {
      return name.substring(0, 25) + '...';
    } else {
      return name;
    }
  }),
  desc_slice: Ember.computed('description', function() {
    var desc = this.get('description');
    if (desc.length > 190) {
      return desc.substring(0, 190) + '...';
    } else {
      return desc;
    }
  })
});
