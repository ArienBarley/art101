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

function readFile(path){

    var req = new XMLHttpRequest();
    req.onload = function() {
        //assign function to be run when the requests
        //comes back which writes the response to the
        // global variable: data
        data = this.responseText
    };
    //run the request
    req.open('GET', path);
    req.send();
};

function getData(apiURL, sentData, type = 'GET', dataType = 'json'){
    $.ajax({
        url: apiURL,
        data: sentData,
        type: type,
        dataType: dataType,
        success: function(data){
            console.log(data);
        },
        error: function(data){
            console.log('error');
            console.log(data);
        },
    });
};
$('#this-that').click( function(){
    getData('https://itsthisforthat.com/api.php?text',{"this":"API","that":"Sorority Chicks"});
});

$('#this-that-fetch').click( function(){
    fetchData('https://itsthisforthat.com/api.php?text',{"this":"API","that":"Sorority Chicks"});
});

async function fetchData(apiURL, sentData, type = 'GET', dataType = 'json'){
    let response = await fetch(apiURL);
    let data = await response.json();
    console.log(data);
};

//end utilities
