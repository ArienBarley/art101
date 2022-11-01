/*
Author: Arien Barley
Created: 30th October
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

/*
Author: Arien Barley
Created: 30th October
License: Public Domain
*/

// fractal div recursive function
function add2Divs(targetEl,stopper = 1000){
    //adds 'children' to the passed div until stopper
    //is below 1
    if (stopper > 1){
        var newEl1 = document.createElement('div');
        var newEl2 = document.createElement('div');
        //set new element styles
        setStylesForRecurr(newEl1);
        setStylesForRecurr(newEl2);

        //add make els children of div
        targetEl.appendChild(newEl1);
        targetEl.appendChild(newEl2, float = 'right');
        //recurr
        add2Divs(newEl2,stopper/2);
        add2Divs(newEl1,stopper/2);
    };

};//end add2Divs


function setStylesForRecurr(el, float = 'left'){
    var  randomcolour = '#' + Math.floor(Math.random()*16777215).toString(16);
    el.style.width = '40%';
    el.style.height = '40%';
    el.style.backgroundColor = randomcolour;
    el.style.border = randomcolour + ' solid 0.1px';
    el.style.float = float;

};

function setNumericStyles(el, n){
    //inplace function to set some numeric
    //styles of an html element to the
    //passed number, n
    el.style.position = 'relative';
    el.style.width = n.toString()+'%';
    el.style.height = n.toString()+'%';
    el.innerHTML = n.toString();
    el.style.backgroundColor = '#'+n.toString(16);
};


function main(){
    //get user input
    var rawform = document.getElementById("input-number");
    var n = rawform[0].value;

    //get parent div
    var targetEl = document.getElementById('output-1');
    //create child div
    var newEl1 = document.createElement('div');
    //set the styles to n where i could be bothered to write
    //ways for that to happen
    setNumericStyles(newEl1,n);
    //place the created El inside the output div
    targetEl.appendChild(newEl1);
    //v

};

//for running code from the page
let mainButton = document.getElementById("main-button");

mainButton.addEventListener('click', event => {
    main();
});

//the end

//recurrrrrrrrrr
function recurr(){

    //get parent div
    var targetEl = document.getElementById('output-2');
    add2Divs(targetEl);
};

//for running code from the page
let breakit = document.getElementById("breakit");

breakit.addEventListener('click', event => {
    recurr();
});
