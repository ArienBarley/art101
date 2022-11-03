/*
Author: Arien Barley
Created: 2nd November
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

//name sorting function
//functions
function fixUserName(name, method) {
    console.log("name = ", name);
    //split string to an array of characters
    var nameArray = name.split('');
    console.log("nameArray = ", nameArray);

    switch (method) {
        case 'sort':
            // sort nameArray
            var fixedNameArray = nameArray.sort();
            break;
        case 'shuffle':
            // thanks to ashleedawg on stack overflow for this algorithm
            //shuffle nameArray
            //step from the end of nameArray choosing a random
            //to the beggining, choosing a random element from
            //the positions before i to go into position i
            var fixedNameArray = nameArray
            console.log('fixed = ',fixedNameArray);
            for(var i= fixedNameArray.length -1;i>0;i--){
                //pick a random element from the array before
                //index i
                var j = Math.floor(Math.random() * (i+1));
                //swap elements i and j in nameArray
                var temp = fixedNameArray[i];
                fixedNameArray[i] = fixedNameArray[j];
                fixedNameArray[j] = temp;
            }//end for

            break;
        default:
            console.log("something must have gond wrong...");
    }

    //turn it back into a string
    var nameFixed = fixedNameArray.join('');
    console.log('fixed = ',fixedNameArray);
    return nameFixed;
}//end fixusername

//recurrrrrrrrrr
function recurr(){
    stopper = document.getElementById('depth').value;
    //get parent div
    var targetEl = document.getElementById('output-2');
    add2Divs(targetEl,stopper);
};


// fractal div recursive function
function add2Divs(targetEl,stopper = 1000){
    //adds 'children' to the passed div until stopper
    //is below 1
    if (stopper > 1){
        var newEl1 = document.createElement('div');
        var newEl2 = document.createElement('div');
        //set new element styles
        //set left div styles based on user input
        setStylesForRecurr( newEl1,
                            float = 'left',
                            border = document.getElementById('border-width').value,
                            height = document.getElementById('height').value,
                            width = document.getElementById('width').value,);
        //set right div styles
        setStylesForRecurr( newEl2,
                            float = 'right',
                            border = document.getElementById('border-width').value,
                            height = document.getElementById('height').value,
                            width = document.getElementById('width').value,
                        );

        //add make els children of div
        targetEl.appendChild(newEl1,overflow = 'hidden');
        targetEl.appendChild(newEl2, float = 'right',overflow = 'hidden');
        //recurr
        add2Divs(newEl2,stopper/2);
        add2Divs(newEl1,stopper/2);
    };

};//end add2Divs

function setStylesForRecurr(el, float = 'left',
                            border = 0.1,height = 40,
                            width = 40){
    //pick a random colour
    var  randomcolour = '#' + Math.floor(Math.random()*16777215).toString(16);
    //set styles to passed values
    el.style.width = width.toString()+'%';
    el.style.height = height.toString()+'%';
    el.style.backgroundColor = randomcolour;
    el.style.border = randomcolour + ' solid '+border.toString()+'px';
    el.style.float = float;
};//end set styles for recurr

//buttons and buttons calling functions
let resetButton = document.getElementById('reset');


// to run the sort and  shuffle programs
let sortButton = document.getElementById("sort");

sortButton.addEventListener('click', event => {
    //get userName
    var name = document.getElementById("username").value;
    //sort it
    nameSorted = fixUserName(name,'sort');
    //write it
    writeToDiv("<pre>Name: " + name+
    "\nSorted: "+nameSorted+"</pre>", "output-1");
});

let shuffleButton = document.getElementById('shuffle');

shuffleButton.addEventListener('click', event => {
    //get userName
    var name = document.getElementById("username").value;
    //sort it
    nameShuffled = fixUserName(name,'shuffle');
    //write it
    writeToDiv( "<pre>Name: " + name + "\nShuffled: " +
            nameShuffled + "</pre>", "output-1");
});

//run the glitchy function
let breakit = document.getElementById("breakit");

breakit.addEventListener('click', event => {
    recurr();
});

//reset the glitchy div
resetButton.addEventListener('click', event => {
    //overwrite inner html of output 2
    document.getElementById('output-2').innerHTML = "click 'Recurr' to "+
        "recursively add children to a div and make some glitchy s*** ";
});
