export function initialize(/* application */) {
  Date.prototype.yyyymmddhhmm = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1);
    var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return "".concat(yyyy).concat('/').concat(mm).concat('/').concat(dd).concat(' ').concat(hh).concat(':').concat(min);
  };
}

export default {
  name: 'date',
  initialize
};
