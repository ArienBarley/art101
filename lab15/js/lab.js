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

function openWeatherURL(lat, lon){
    api_key = "6e28dbbec41e904de1f951e2d12e52e4";
    if (!(lat || lon)){
        //random lattitude
        lat = Math.random()*180 -90;
        //random longitude
        lon = Math.random()*360 -180;
    }

    return "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key;
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
            callback( 'Probably a CORs policy error, install an allow-crossorigin requests plugin or similar to get this to work');
        },

    });
};

function processOpenWeatherData(data){
    // writes some information from the passed json from the open weather
    // api into html to be written to the output div

    var text = "<b>"+(data.name==""?"This place is nameless</b>":data.name+"</b> ("+data.sys.country+")")+"<br>";
    //placename and country
    text+=  "<u>"+data.coord.lat+ "&degN, "+data.coord.lon+"&degW</u><br>";

    //weather description
    text +=data.weather[0].description +"<br>"

    //cloudiness
    text += "Cloudiness: " + data.clouds.all+"% <br>";

    //wind speed
    text += "Wind Speed: "+data.wind.speed+" meters per second<br>";
    
    console.log(text);
    return text;
}

$('#this-that').click( function(){
    d = getData('https://itsthisforthat.com/api.php?text',
                {"this":"API","that":"Sorority Chicks"},
                callback = function(data){
                    $("#output-1").html("<p>" + data + "</p>");
                });
});


$('#contact-openweather-random').click( function(){
    url = openWeatherURL();
    console.log(url)
    getData(url,
            sentData = {},
            callback = function(data){
                var text = processOpenWeatherData(data);
                $("#output-2").html(text);
                console.log('runin');
            },
        );
});

$('#contact-openweather-coords').click( function(){
    //get inputs
    var lat = $("#lat").val();
    var lon = $("#lon").val();
    //validate coordinates
    if ((-90<=lat&&lat<=90)&&(-180<=lon&&lon<=180)){
        var url = openWeatherURL(lat,lon);
        console.log("URL:",url);
        getData(url,
                sentData = {},
                callback = function(data){
                    text = processOpenWeatherData(data);
                    $("#output-2").html(text);
                },
            );
    }else{
        //if the coordinates are invalid
        $("#output-2").html("Invalid coordinates");
    }//end else

});



//end utilities
