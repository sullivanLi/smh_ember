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

    Ember.$('#error-msg').hide();
  },
    actions: {
      submit_form() {
        Ember.$('#error-msg').hide();
        var event_name = Ember.$('#event-name').val();
        var event_dates = Ember.$('#date-area').val();
        var event_desc = Ember.$('#desc-area').val();
        if (event_name === '' || event_dates === '' || event_desc === ''){
          Ember.$('#error-msg').fadeIn();
          return;
        }
        var url = 'http://localhost:9292/events';
        Ember.$.ajax({
          url: url,
          type: 'POST',
          data: { name: event_name, dates: event_dates, description: event_desc },
          complete: function (data) {
            if(data['responseText']) {
              var json_data =  Ember.$.parseJSON(data['responseText']);
              this.sendAction('onComplete', json_data.id);
            }
          }
        });
      }
    }
});
