/*
Author: Arien Barley
Created: 30th November
License: Public Domain
*/

// functions
//utilities

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

//for this lab
var numComics = 2000;
var currentComic = null;
function randomXKCD(){
    return "https://xkcd.com/"+Math.floor(Math.random()*numComics)+"/info.0.json";

};

function getData(apiURL, sentData = {}, callback = function() {console.log('no function passed')}, type = 'GET', dataType = 'json', ){
    $.ajax({
        url: apiURL,
        data: sentData,
        type: type,
        //dataType: dataType,
        success: function(data){
            console.log('succesful ajax request')
            callback(data);

        },
        error: function(data){
            console.log('error in ajax request');
            callback('Possibly a CORs policy error, install an allow-cross-origin requests plugin or similar to get this to work');
        },

    });
};

function processXKCD(data){
    //update current comic number (for next and previous functions)
    currentComic = data.num;
    out = $("#output-1");
    //clear output div
    out.html("");
    //add elements:
    //comic number
    out.append($("<p id = 'comic-number' ><u>Comic Number:"+data.num+"</u></p>"));
    //title
    out.append($("<h1>"+data.title+"</h1>"));
    //img
    out.append($("<img src = "+data.img+">"));
    //description
    out.append($("<p>"+data.alt+"</p>"));
};


$('#random-comic').click( function(){
    url = randomXKCD();
    console.log(url)
    getData(url,
            sentData = {},
            callback = function(data){
                var text = processXKCD(data);
            },
        );
});

$('#get-comic-n').click( function(){
    //get inputs

    var n = $("#comic-no").val();
    //validate coordinates
    if ((n>0)&&(n<=numComics)){
        var url = "https://xkcd.com/"+n+"/info.0.json";
        console.log("URL:",url);
        getData(url,
                sentData = {},
                callback = function(data){
                    text = processXKCD(data);
                    $("#output-1").html(text);
                },
            );
    }else{
        //if the coordinates are invalid
        $("#output-1").html("Invalid comic number :(");
    }//end else

});

$('#next-comic').click( function(){
    //get inputs
    console.log(currentComic);
    var n = currentComic+1;
    console.log(n)
    //validate coordinates
    if ((n>0)&&(n<=numComics)){
        var url = "https://xkcd.com/"+n+"/info.0.json";
        console.log("URL:",url);
        getData(url,
                sentData = {},
                callback = function(data){
                    text = processXKCD(data);
                    $("#output-1").html(text);
                },
            );
    }else{
        //if the coordinates are invalid
        $("#output-1").html("That was the latest one, soz.");
    }//end else
});

$('#prev-comic').click( function(){
    //get inputs
    console.log(currentComic)
    var n = currentComic-1;
    //validate coordinates
    if ((n>0)&&(n<=numComics)){
        var url = "https://xkcd.com/"+n+"/info.0.json";
        console.log("URL:",url);
        getData(url,
                sentData = {},
                callback = function(data){
                    text = processXKCD(data);
                    $("#output-1").html(text);
                },
            );
    }else{
        //if the coordinates are invalid
        $("#output-1").html("That was the first one. No more in this direction, soz. ");
    }//end else
});


//load todays comic when the page loads
function onLoad(){
    getData('https://xkcd.com/info.0.json', sentData = {},
    callback = function(data){
        numComics = data.num;
        console.log('numcomics =',numComics);
        console.log('currentComic =',currentComic);
        text = processXKCD(data);
        console.log("a;ldkjf;",currentComic);
        $("#output-1").html(text);
    });

};


//end utilities
