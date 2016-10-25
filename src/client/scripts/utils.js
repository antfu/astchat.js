import Emoji from 'emojione/lib/js/emojione'

export default {
  emoji(t) {return Emoji.toImage(t)},
  datetime(time) {
    var a = new Date(time);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = this.pad(a.getHours(),2);
    var min = this.pad(a.getMinutes(),2);
    var sec = this.pad(a.getSeconds(),2);
    var time = hour + ':' + min + ':' + sec + ', ' + date + ' ' + month;
    return time;
  },
  pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
