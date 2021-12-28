var _ = require('underscore');
var arr = [3, 6, 9, 1, 12];

console.log(arr[0]);

console.log(_.first(arr));  //first는 입력된 arr의 첫 번째 원소를 의미
console.log(arr[arr.length-1]);
console.log(_.last(arr));

