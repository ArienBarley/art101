/*
Author: Arien Barley
Created: 20 October 2022
License: Public Domain
*/

function fixName(name) {
    console.log("userName = ", userName);
    //split string to an array of characters
    var nameArray = userName.split('');
    console.log("nameArray = ", nameArray);

    //sort characters
    var nameArraySorted = nameArray.sort();
    console.log(nameArraySorted);

    //turn it back into a string
    nameSorted = nameArraySorted.join('');
    console.log(nameArraySorted);
    return nameSorted;
}//end



// to run the program
let fixName = document.getElementById("reset");

fixName.addEventListener('click', event => {
    //get userName
    var name = document.getElementById("username");
    console.log(name)
    //sort it
    nameSorted = sfixName(name, method = 'sort');
    //write it
    document.getElementById("name-sort-output").innerHTML = "<pre>Wrong:" +
                            name + "\n Fixed:"+nameSorted+"</pre>";
});
/*
//do function
document.writeln("running <br>");
fixedName = sortUserName();
//output
window.confirm("Fixed it:" + fixedName);
document.writeln("Fixed it:", fixedName, "<br>");
document.writeln("ran<br>")
*/
