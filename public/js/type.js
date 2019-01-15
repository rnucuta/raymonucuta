// set up text to print, each item in array is new line
var aText = new Array(
"Hi, I'm Raymond.","","I'm a high school sophomore who likes programming and tinkering. I've started multiple apps for my company Nucuta Innovations, LLC. and I am currently an intern at Kronos Consulting, LLC. When not working or messing around with code, I use GIMP to make art or work on my electrical motorized bike. I love tinkering and building cool stuff with Arduinos! Check out my Github page or my projects page to see cool projects I am working on or have finished."
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
 
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
 
function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");
 
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 500);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
 }
}


typewriter();