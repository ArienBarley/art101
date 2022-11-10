/*
Author: Arien Barley
Created: 2nd November
License: Public Domain
*/

// functions
//utilities
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
};//end zipped

function stringToBin(s){
    //takes a binary string and
    //returns the integer it represeents
    var arr = s.split('');
    var x=0;
    for (var i = 0; i<arr.length;i++){
        x += arr[i]*Math.pow(2,i);
    };
    return x;
};// end string to bin

//end utilities
function nameToNumber(name){
    number = 1;
    //create a big number based on the name
    for (var i = 0; i<name.length;i++){
        number *= name[i].charCodeAt(0);
    };
    //hash it by the mid-square method
    //square the number
    number *= number;
    //convert to binary
    binary = number.toString(2);
    //take the middle two digits (giving a number betwen 0 and 3)
    //find the mid index
    mid = Math.floor(binary.length / 2);
    middle = binary.slice(mid-1,mid+1);
    //return that as an integer
    return stringToBin(middle);
};

function sortingHatBasic(){
    //get user input
    userName = $('#user-name').val();
    //take mod to get a number between 0 and 3
    nameLen = userName.length;
    nameLen %=4;
    if(nameLen==0){
        $('#output-1').html('Gryffindor');
    }else if(nameLen==1){
        $('#output-1').html('Slytherin');
    }else if(nameLen==2){
        $('#output-1').html('Hufflepuff');
    }else{
        $('#output-1').html("Ravenclaw");
    };
};

function sortingHatRefactorHash(){
    //set outpus
    outputs = ['Gryffindor','Slytherin','Hufflepuff',
            "Ravenclaw"];
    //get userName
    userName = $('#user-name').val();

    //convert it through a hashing function into a
    //number between 0 and 3
    output = outputs[nameToNumber(userName)];
    $('#output-1').html(output);
};

function isZeroMod3(){
    userNumber = $('#usernumber').val();

    if (userNumber % 3 == 0 ){
        $('#output-2').html('<p>'+userNumber+' is divisible by 3, remainder: 0</p>');
    }else if(userNumber % 3 == 1){
        $('#output-2').html('<p>'+userNumber+' is not divisible by 3, (remainder: 1</p>');
    }else{
        $('#output-2').html('<p>'+userNumber+' is not divisible by 3, (remainder: 2</p>');
    };
};
//read file
function readFile(path){
    console.log('readfile running: '+path)
    returnedText = ''
    var req = new XMLHttpRequest();
    req.onload = function() {

        returnedText = this.responseText;
    };
    req.open('GET', path);
    req.send();
    return returnedText;
};

//button management
$('#reveal-house-affiliation').click(function(){
    readFile('https://arienbarley.github.io/art101/lab12/js/data.txt');
});

$('#find-house').click(sortingHatBasic);
$('#div-3').click(isZeroMod3);
$('#find-house-hash').click(sortingHatRefactorHash);
