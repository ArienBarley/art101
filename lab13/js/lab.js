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


function isPrime(n){
    console.log('ispirme running')
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

function wordFactorLoop(n=100){
    //generates a long string of the numbers from 1 to n
    //with words next to them based on what they are divisible by

    //user chosen factors and words that correspond to them
    factors = [ $('#factor1').val(),
                $('#factor2').val(),
                $('#factor3').val(),
                $('#factor3').val(),];

    words = [   $('#word1').val(),
                $('#word2').val(),
                $('#word3').val(),
                $('#word4').val(),];
    text = '';
    for (i = 1; i<=n; i++){
        console.log(i);
        factorInFactors = false;
        //loop through factors
        for(j = 0; j<factors.length; j++){
            //check if factor

            if (i % factors[j] == 0){
                //append word to text being generated
                factorInFactors = true;
                text += words[j];
            }//end if
        };//end innner for

        if(!factorInFactors){
            if (isPrime(i)){
                text+= '<b>'+i+'</b>';
            }else{
                text += i;
            };
        };
        text+='<br>'
    };//end outer for

    return text;
};//end wordfactor loop


$('#run-fizbuz-loop').click(function(){
    lim = $('#limit').val();
    text = wordFactorLoop(n = lim);
    $('#output-1').html(text);
});
