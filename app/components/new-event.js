import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var datetime_array = [];
    Ember.$('#add-date-btn').datetimepicker({
      onShow: function(){
        var str = Ember.$('#date-area').val();
        if(str !== ''){
          datetime_array = str.split(',');
        }
      },
      onSelectTime: function(current_time){
        datetime_array.push(current_time.yyyymmddhhmm());
        datetime_array = Ember.$.unique(datetime_array);
        Ember.$('#date-area').val(datetime_array);
      }
    });
    Ember.$('#clear-date-btn').on('click', function(){
      datetime_array = [];
      Ember.$('#date-area').val("");
    });
  }
});
