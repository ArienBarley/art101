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

function setNumericStyles(el, n){
    //inplace function to set numeric
    //styles of an html element to the passed number, n
    console.log('setting styles')
    el.style.width = 'n%';
    el.style.height = 'n%';
    el.innerHTML = n.toString();
    el.style.backgroundColour = '#'+ n.toString(16);
    return el;
};


function main(){
    //get user input
    var rawform = document.getElementById("input-number");
    n = rawform[0].value;

    //get parent div
    var targetEl = document.getElementById('output-1');
    //create child div
    var newEl1 = document.createElement('div');
    newEl1.style.width = '50';
    newEl1.style.height = '50';
    newEl1.innerHTML = n.toString();
    newEl1.style.backgroundColour = 'black';
    //set numeric styles
    //newEl1 = setNumericStyles(newEl1,n);

    //place the created El inside the output div
    targetEl.appendChild(newEl1);
    //var newEl2 = document.createElement('div');


};

//for running code from the page
let mainButton = document.getElementById("main-button");

mainButton.addEventListener('click', event => {
    main();
});

//the end
