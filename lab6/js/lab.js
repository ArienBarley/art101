/*
Author: Arien Barley
Created: 18 October
License: Public Domain
*/
//function
function random_from(lst) {
  //returns a random item from the passed list
  return lst[~~(lst.length * Math.random())];
}
//define variables
myTransport = ["Hitch-hike","UCSC Loop Bus","SkateBoard","Airplane","Santa Cruz Metro Bus","Bus 17","Train","TFL (i miss u)"]
myMainRide = {
  type: "Hitch-hike",
  make: "Cardboard Sign",
  colour: "Brown",
  ink: "Sharpy",
  destinations: ["SAFEWAY", "MONTEREY", "LOS ANGELES", "MENDOCINO", "FAIRFAX", "BIG SUR", "EAST COAST?", "SEATTLE", "VANCOVER ISLAND", "CRECENT CITY", "PORTLAND", "LONDON", "SWINDON", "STROUD", "CIRENCESTER", "BRISTOL", "DEN HAAG", "SOUTH", "FREIBURG", "BERLIN", "NORTH", "ANYWHERE BUT HERE"],
  destination: function(){
    return rand(myMainRide.destinations);
  }
}//end myMainRide

console.log(myMainRide)
for (const [key, value] of Object.entries(myMainRide)){
  if (key.toString() == 'destinations'){
    continue;
  //}else if (key.toString() == 'destination'){

  }else{
    document.writeln(key + " : " + value + "<br>");
  }
}
