/*
Author: Arien Barley
Created 16 october
Licence: Public Domain
Just seeing if i can make a loop :)*/
/*defining innitial variable vales*/
text = "*";
fib = 1;
lastfib = 0;
//program
for (let i = 0; i < 21; i++) {
  //add fin number of stars to text
  for (let j = 0; j<fib-1; j++) {
    text += '*'
  }
  //write a fib number of stars to page
  document.writeln(text+"<br>");
  //increment fibbonacci sequence
  temp = fib
  fib += lastfib;
  lastfib = temp;

  //test
  //document.writeln(fib);
}
