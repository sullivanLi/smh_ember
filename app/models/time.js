import DS from 'ember-data';

export default DS.Model.extend({
  event_id: DS.attr('string'),
  time: DS.attr('date'),
  event: DS.belongsTo('event'),
  event_time: Ember.computed('time', function() {
    var time = this.get('time');
    var date = time.getFullYear() + '/' + time.getMonth() + '/' + time.getDate();
    date = date + ' ' + addZero(time.getHours()) + ':' + addZero(time.getMinutes());
    date = date + ' ' + days[time.getDay()];
    return `${date}`;
  })
});

var days = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
