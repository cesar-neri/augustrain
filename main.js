var canvas;
var xspacing = 3.5;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 350.0; // Height of wave
//var period = 200.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var bcolor = 255; //Background color

function setup() {
  canvas = createCanvas(500, 500);
  // Move the canvas so it's in <div id="sketchHolder">.
  canvas.parent('sketchHolder');

  //SLIDERS
  //speed
  speedSlider = createSlider(-300, 300, 20);
  speedSlider.addClass("slider");
  speedSlider.parent('speedSlider');
  speedSlider.input(updateValues);

  //period
  periodSlider = createSlider(-500, 500, 200);
  periodSlider.addClass("slider");
  periodSlider.parent('periodSlider');
  periodSlider.input(updateValues);

  //circleSize
  circleSizeSlider = createSlider(1, 30, 3, .01);
  circleSizeSlider.addClass("slider");
  circleSizeSlider.parent('circleSizeSlider');
  circleSizeSlider.input(updateValues);

  //zMultiplier
  zMultiplierSlider = createSlider(1, 20, 9);
  zMultiplierSlider.addClass("slider");
  zMultiplierSlider.parent('zMultiplierSlider');
  zMultiplierSlider.input(updateValues);
  //waveMapper
  waveMapperSlider = createSlider(1, 10, 3, .01);
  waveMapperSlider.addClass("slider");
  waveMapperSlider.parent('waveMapperSlider');
  waveMapperSlider.input(updateValues);

  //reset button
  resetButton = createButton("RESET");
  resetButton.mousePressed(resetValues);
  resetButton.parent('resetButton');

  //update the displayed numerical values for sliders
  updateValues();
}

function draw() {
  background(bcolor);
  //dynamically adjust canvas size to screen width
  var divWidth = document.getElementById('sketchHolder').offsetWidth;
  //set min width of canvas
  if (divWidth < 300){
    divWidth = 300;}
  canvas.size(divWidth*.8,divWidth*.8);

  push();
  fill(255);
  noStroke();
  rect(0,0,divWidth,divWidth);
  pop();

  w = width;
  dx = (TWO_PI / periodSlider.value()) * xspacing;
  yvalues = new Array(floor(w/xspacing));
  calcWave();
  renderWave();

}

function updateValues(){
  //update the displayed numerical values for sliders
  var speedValue = document.getElementById("speedValue");
  speedValue.innerHTML = speedSlider.value();
  var periodValue = document.getElementById("periodValue");
  periodValue.innerHTML = periodSlider.value();
  var circleSizeValue = document.getElementById("circleSizeValue");
  circleSizeValue.innerHTML = circleSizeSlider.value();
  var zMultiplierValue = document.getElementById("zMultiplierValue");
  zMultiplierValue.innerHTML = zMultiplierSlider.value();
  var waveMapperValue = document.getElementById("waveMapperValue");
  waveMapperValue.innerHTML = waveMapperSlider.value();

}

function resetValues(){
  //resets values back to original setup
  speedSlider.value(20);
  periodSlider.value(200);
  circleSizeSlider.value(3);
  zMultiplierSlider.value(9);
  waveMapperSlider.value(3);
  updateValues();
}


function calcWave() {
  // Increment velocity
  theta += (speedSlider.value()/1000);

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
}

function renderWave() {
  // Draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    for (var z = 0; z < 15; z++) {
    push();
    translate(width*.75,height*.25);
    rotate(PI/2);
    scale(.5);
    stroke((z*10)+80);
    strokeWeight(.5);
    noFill();
    ellipse(x*xspacing, height/2+(yvalues[x+(z*zMultiplierSlider.value())]*sqrt((x/(amplitude/2))*(x/(amplitude/2)))*sin(map(x, 0, yvalues.length, 0, waveMapperSlider.value()))), circleSizeSlider.value());
    pop();
  }
}
}
