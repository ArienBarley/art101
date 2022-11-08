/*
Author: Arien Barley
Created: 3rd November
License: Public Domain
*/
//end utilities
let buttonNumber = 1;
//functions
//function create2Buttons(button1){}
function createButton(){
    //console.log(buttonNumber);
    $("#output-1").append(
        "<button class = 'creator-button' id = creator-button-"+buttonNumber.toString()
        +"> Create another button </button>");
    $('#creator-button-'
    +buttonNumber.toString()).click(createButton);
    buttonNumber++;
};

//buttons and calls
$('#creator-button-0').click(createButton);



//old code to demonstrate what went wrong

function createGlitchButton(){
    //console.log(buttonNumber);
    $("#output-0").append(
        "<button class = 'glitch-demo'> Create n-i buttons</button>");
    $('.glitch-demo').click(createGlitchButton);
};

//buttons and calls
$('.glitch-demo').click(createGlitchButton);
