/*
Author: Arien Barley
Created: 3rd November
License: Public Domain
*/

//global variabe
let buttonNumber = 1;

//functions
function createButton(){
    //create a button in the output div
    $("#output-1").append(
        "<button class = 'creator-button' id = creator-button-"+buttonNumber.toString()
        +"> Create another button </button>");
    //add the event listener to the newly created button
    $('#creator-button-'
    +buttonNumber.toString()).click(createButton);
    //increment the global counter so the next button has a unique ID
    buttonNumber++;
};

//buttons and calls
$('#creator-button-0').click(createButton);



//old code to demonstrate what went wrong
function createGlitchButton(){
    //create a button in the output div
    $("#output-0").append(
        "<button class = 'glitch-demo'> Create n-i buttons</button>");

    $('.glitch-demo').click(createGlitchButton);
};

//buttons and calls
$('.glitch-demo').click(createGlitchButton);
