/*
Author: Arien Barley
Created: 25 October
License: Public Domain
*/

// functions
//utilities
function writeToDiv(text, id){
    //writes the passed text to the specified div
    document.getElementById(id).innerHTML = text;
};//end writeToDiv

function arrToString(arr){
    //returns the array in a better format for
    //writing in html
    s = '';
    for (i=0;i<arr.length;i++){
        s += arr[i].toString() + "<br>";
    };//end for
    return s;
};//end arrToString

function random_from(lst) {
  // returns a random item from the passed list
  return lst[~~(lst.length* Math.random())];
};//end random_from

function range(end, start = 0, increment = 1){
    //returns an array incrementing as specified
    result = [];
    for (i=start;i<=end; i += increment){
        result.push(i);
    }//end for
    return result
}//end range

function zip(...args){
    // takes  arrays as arguments
    //and returns an array of the form
    //[ [arr1[0],arr2[0], arr3[0],...], [[arr1[1], arr2[1],arr3[1],...],
    //[arr1[2], arr2[2], arr3[2],...], ..., [[arr1[n], arr2[n], arr3[n],...] ]
    var arrays=[];
    //turn arguments into an array
    for (var i = 0; i<args.length; i++){
        arrays.push(args[i]);
    };

    zipped = arrays[0].map(function(a,i){
        var result = [a];
        //step through arrays appending the ith element from
        //each array to result
        for (var j = 1; j<arrays.length; j++){
            result.push(arrays[j][i]);
        };
        return result;
    });

    console.log(zipped)
    return zipped;
};//end zip

//end utilities

function isPrime(n){
    //step through possible factors
    for (i = 2; i<Math.ceil(Math.sqrt(n))+1; i++){
        if (n % i == 0) {
            //if a factor is found return false
            return false;
        }else{
            continue;
        };
    };
    //if the loop finishes without finding a factor
    return true;
};//end isPrime

function sigmoid(x){
    return 1/(1+Math.exp(-x));
};//end sigmoid

//main ting
function main(){
    //take user input from form
    var rawform = document.getElementById("input-number");
    n = rawform[0].value;

    //generate an array of numbers from 1 to n
    var arr = range(n);

    //generate corresponding array for functions
    isprimeArr = arr.map(isPrime);
    sigmoidArr = arr.map(sigmoid);

    //zip 'em and print 'em
    //console.log(zip(arr,isprimeArr));
    writeToDiv("<br> Is it prime?:<br>"+arrToString(zip(arr,isprimeArr))+"<br> Sigmoid Array:<br>"+arrToString(zip(arr,sigmoidArr))
    ,"output-1");
};

//for running code from the page
let mainButton = document.getElementById("main-button");

mainButton.addEventListener('click', event => {
    main();
});

//the end







//dump

//to create a global scope function ANONYMOUS
//like llambda in python;
var sigmoid = function(x,y){
    return 1/(1+Math.exp(-x));
};
