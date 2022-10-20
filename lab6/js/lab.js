/*
Author: Arien Barley
Created: 18 October
License: Public Domain
*/

// functions
function random_from(lst) {
  // returns a random item from the passed list
  return lst[~~(lst.length* Math.random())];
}

// define variables
myTransport = ["Hitch-hike","UCSC Loop Bus","SkateBoard","Airplane",
              "Santa Cruz Metro Bus","Bus 17","Train","TFL (i miss u)"]

myMainRide = {
  // define constants
  type: "Hitch-hike",
  make: "Cardboard Sign",
  colour: "Brown",
  ink: "Sharpy",
  birthyear: 2022,
  birthmonth: 10,
  birthday: 11,
  sign_text_options: ["SAFEWAY", "MONTEREY", "LOS ANGELES", "MENDOCINO",
                      "FAIRFAX", "BIG SUR", "EAST COAST?", "SEATTLE",
                      "VANCOVER ISLAND", "CRECENT CITY", "PORTLAND", "LONDON",
                      "SWINDON", "STROUD", "CIRENCESTER", "BRISTOL", "DEN HAAG",
                      "SOUTH", "FREIBURG", "BERLIN", "NORTH",
                      "ANYWHERE BUT HERE"],

  // chooses a random location or direction from sign_text_options
  this_destination: function(){
    return random_from(myMainRide.sign_text_options);
  },

  // calculates the age of the sign
  age: function(){
    return [2022 - myMainRide.birthyear, 10-myMainRide.birthmonth,
       19-myMainRide.birthday];
  },

  // prints information from the variable in a readable way
  write_self: function(){

    document.writeln("<b>My Main Ride: </b><br>")

    // cycle through myMainRide's contents
    for (const [key, value] of Object.entries(myMainRide)){

      // skip the long list and the functions
      if ((key.toString() == 'sign_text_options') ||
          (key.toString() == 'write_self')) {
        continue;

      }else if (key.toString() == 'age'){
        // calculate age
        age = myMainRide.age();
        // print age nicely
        document.writeln(key + " : " + age[0] + " Years " + age[1] +
        " Months " + age[2] + " Days <br>" )

      }else if(key.toString() == 'this_destination'){
        // calls the function and writes the result: a random element from
        // sign_text_options
        document.writeln(key + " : " + myMainRide.this_destination() + "<br>");
      }else{
        // other variables can be written generically
        document.writeln(key + " : " + value + "<br>");
      }//end elseif
    }//end for
  }//end write self
}//end myMainRide


//output

document.writeln("Kinds of transport I use: " + myTransport)
//print out raw JSON values
document.writeln("My Main Ride: <pre>",
  JSON.stringify(myMainRide, null, "\t"), "<pre>");

//print out an instance nicely
myMainRide.write_self()
