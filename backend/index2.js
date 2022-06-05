var array1 = ["cat", "sum","fun", "run"];
var array2 = ["bat", "cat","dog","sun", "hut", "gut"];
const intersection = array1.filter(element => array2.includes(element));
console.log(intersection)