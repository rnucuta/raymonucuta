// set up text to print, each item in array is new line
var aText = new Array(
"Hi, I'm Raymond Nucuta.","","I'm an ASU CS student who created this site to share my initiatives and showcase my programming skills.","","So, what do I do? Currently, I am invested in a few projects: I'm the co-founder/CTO of Screening On Wheels, a 501(c)(3) cancer screening non-profit; I'm developing an automated crypto hedge fund with a classmate; and I'm the co-founder/CTO of Ecotivity LLC, a recycling business working with Georgia Tech. For more about me, please check out my Github page or my résumé."
);
var iSpeed = 30; // time delay of print out
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