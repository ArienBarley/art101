/*
Author: Arien Barley
Created: 25 October
License: Public Domain
*/

// functions
function random_from(lst) {
  // returns a random item from the passed list
  return lst[~~(lst.length* Math.random())];
};

function sigmoid(x){
    return 1/(1+Math.exp(-x));
};

//to create a global scope function ANONYMOUS
//like llambda in python;
var sigmoid = function(x,y){
    return 1/(1+Math.exp(-x));
};

//a callback function is a function passed to another function to be called later


numbers = [-160,-80,-40,-20,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 40, 80, 160,];
document.write(numbers);
aMap = numbers.map(sigmoid);
document.write(aMap);
console.log(aMap)

function writeToDiv(text, id){
    document.getElementById(id).innerHTML = text;
};

writeToDiv("<br> what's hup <br>","output-2");
