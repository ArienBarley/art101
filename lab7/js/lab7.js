/*
Author: Arien Barley
Created: 20 October 2022
License: Public Domain
*/

function sortUserName() {
    var userName = window.prompt("Hi please tell me your name so I can fix it ;)");
    console.log("userName = ", userName);
    //split string to an array of characters
    var nameArray = userName.split('');
    console.log("nameArray = ", nameArray);

    //sort characters
    var nameArraySorted = nameArray.sort();
    console.log(nameArraySorted);

    //turn it back into a string
    nameSorted = nameArraySorted.join('');

    return nameSorted;
}//end

sortUserName();
