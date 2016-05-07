import DS from 'ember-data';

export default DS.Model.extend({
  event_id: DS.attr('string'),
  date_str: DS.attr('string'),
  event: DS.belongsTo('event'),
  people: DS.hasMany('person')
});
