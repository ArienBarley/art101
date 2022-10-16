/*
Author: Arien Barley
Created 16 october
Licence: Public Domain
*/

// define variables
make = "Greedy INC.";
model = "Four Wheels";
colour = "Red";
year = 2012;
owners = ["This Guy","That Guy","The Other Guy"];

//calculate age
age = 2022 - year;

//check if i own it
if (owners.includes("Me")){
  i_ownit = true;
}else{
  i_ownit = false;
}

//output
document.writeln("Make: " + make + "<br>");
document.writeln("Model: " + model + "<br>");
document.writeln("Colour: " + colour + "<br>");
document.writeln("Year: " + year + "<br>");
document.writeln("Age: " + age + " years<br>");
document.writeln("Owners: " + owners + "<br>");
document.writeln("I own it?: " + i_ownit + "<br>");

//another way of doing it
document.writeln("----------Another way---------<br>");

//define lists
property_names = ["Make", "Model","Colour","Year", "Owners"];

values = ["More General INC.","Four Wheels Again","Green",2021,
          ["This Guy","That Guy","The Other Guy"]];

//calculate age and update lists
values.push( (2022-values[3]).toString() + " Years");
property_names.push("Age");

//check if i ownit
i_ownit = owners.includes("Me");

//update lists
property_names.push("I own it?");
values.push(i_ownit);

//output
for (i = 0; i < values.length; i++){
  document.writeln(property_names[i] +": "+values[i]+ "<br>");
}
