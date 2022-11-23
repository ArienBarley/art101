/*
Author: Arien Barley
Created: 22nd November
License: Public Domain
*/
//thanks to mordred on stack overflow for this (comments are mine)
function dateDiff(startingDate, endingDate) {
  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
  if (!endingDate) {
      //set endingdate to now if non is passed
    endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate);
  if (startDate > endDate) {
    const swap = startDate;
    startDate = endDate;
    endDate = swap;
  }

  const startYear = startDate.getFullYear();
  //check for leapyears
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();

  //remove any negative months and update the year accordingly
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  //get difference in dates
  let dayDiff = endDate.getDate() - startDate.getDate();
  //if its -ve then it has crossed a month boundary
  if (dayDiff < 0) {
      //update the month for the fact that the days take us to the next one
    if (monthDiff > 0) {
      monthDiff--;
    } else {
        //if the take us to fewer years
      yearDiff--;
      monthDiff = 11;
    }
    //add the days in the start month
    //(to get the number of days into the next month )
    dayDiff += daysInMonth[startDate.getMonth()];
  }//otherwise we dont need to change the date

  return [yearDiff,monthDiff, dayDiff];
}

// functions
function random_from(lst) {
  // returns a random item from the passed list
  return lst[~~(lst.length* Math.random())];
};

function range(end, start = 0, increment = 1){
    //returns an array incrementing as specified
    result = [];
    for (i=start;i<end; i += increment){
        result.push(i);
    }//end for
    return result
}//end range

// define variables
myTransport = ["Hitch-hike","UCSC Loop Bus","SkateBoard","Airplane",
              "Santa Cruz Metro Bus","Bus 17","Train","TFL (i miss u)"]

class HitchHike {
    constructor(destination){
        this.type = "Hitch-hike";
        this.make = "Cardboard Sign";
        this.colour = "Brown";
        this.destination = destination;
        this.mediums = ['Sharpy','Charcoal','Tape',]
        this.medium = random_from(this.mediums);
        this.birthday = new Date(random_from(range(2022,2016)),//year
                                 random_from(range(12)),//month
                                 random_from(range(28)),//one never hitchHikes
                                                        //at the end of longer months...
                                 );
        this.age = dateDiff(this.birthday);
        console.log(this.birthday)
        console.log(this.age)
    }
    // define constants

    getString(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        console.log('getting string ')
        let s = "<b>a Hitch Instance</b>";
        s += "<br>Make: " + this.make;
        s += "<br>Colour: " + this.colour;
        s += "<br>Destination: " + this.destination;
        s += "<br>Medium: " + this.medium;
        let d = this.birthday.getDate()
        s += "<br>Birthday: " + d + ( (d%10>3) ? 'th' : (d%10==3)?'rd': (d%10==2)? 'nd':'st').toString()+' of '
                + months[this.birthday.getMonth()]+' '
                +this.birthday.getFullYear();

        let a = this.age;
        let ageString = a[0] +' Year'+(( a[0]==1 )? ' ': 's ')
                    + a[1] + " Month"+(( a[1]==1 )? ' ': 's ')
                    + a[2] + " Day"+(( a[2]==1 )? ' ': 's ');

        s += "<br>Age: " + ageString;
        return s;
    }//getstring

    write_self(){
        $('#output-1').html(this.getString());
    }
};

const sign_text_options = ["SAFEWAY", "MONTEREY", "LOS ANGELES", "MENDOCINO",
                          "FAIRFAX", "BIG SUR", "EAST COAST?", "SEATTLE",
                          "VANCOVER ISLAND", "CRECENT CITY", "PORTLAND", "LONDON",
                          "SWINDON", "STROUD", "CIRENCESTER", "BRISTOL", "DEN HAAG",
                          "SOUTH", "FREIBURG", "BERLIN", "NORTH",
                          "ANYWHERE BUT HERE"];

function write_random_dest(){
    console.log(sign_text_options)
    $('#dest').attr('value', random_from(sign_text_options));
};
//output
$('#make-hitch').click(function(){
    hitch = new HitchHike($('#dest').val());
    console.log(hitch);
    hitch.write_self();
})
