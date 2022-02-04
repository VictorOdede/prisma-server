const { format } = require('date-fns');

// create timestamp
const getTime = () => {
  let currentDate = format(new Date(), 'yMMdHHmmss');
  return currentDate;
} 

const newTime = getTime();

console.log(`${newTime}`);

function pad (n) {
    return n<10 ? '0'+n : n
  }
  
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = pad(currentDate.getMonth());
  var day = pad(currentDate.getDate());
  var hour = pad(currentDate.getHours());
  var minute = pad(currentDate.getMinutes());
  var second = pad(currentDate.getSeconds());
  
  var timeNow = `${year}${month}${day}${hour}${minute}${second}`
  console.log(timeNow);