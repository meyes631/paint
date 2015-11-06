//============================
//  Paint
//============================

var drawingCanvas
var colorPicker;
var slider;
var clearButton;
var saveButton;
var clearButton
var brushPicker;
var brushType;
var paintBucket

var apple,chromy;



function preload(){
    apple = loadImage("images/apple.png");
    chromy = loadImage("images/chromy.png");
    imageMode(CENTER);
}


function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(800, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");
    
    //set up the color picker
    colorPicker = select("#ColorPicker");
    
    //set up the paintbrush width slider
    slider = createSlider(1, 50, 10);
    slider.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush type
    brushPicker = createSelect();
    brushPicker.parent("brushType")
    brushPicker.option('paint brush');
    brushPicker.option('spray can');

    brushPicker.option('apple');
    brushPicker.option('triangle');
    brushPicker.option('chromy');
    brushPicker.option('paint bucket');
    brushPicker.option('eraser');

    brushPicker.changed(changeBrush);
    brushType = brushPicker.value();
}

function draw() {
    
    if (mouseIsPressed) {
        if (brushType == "spray can"){
            sprayCan();
        } else if(brushType == "paint brush"){
            standardStroke(); 
        } else if(brushType == "apple"){
            drawApple(); 
        } else if(brushType == "triangle"){
            triangleStroke(); 
        } else if(brushType == "chromy"){
            drawChromy(); 
        } else if(brushType == "paint bucket"){
            paintBucket(); 
        } else if(brushType == "eraser"){
            eraserBrush(); 
        }
        
    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(HAND);
    }
}

//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255, 
    //         colorPicker.elt.color.rgb[1]*255, 
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

function triangleStroke(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());
    stroke("#"+colorPicker.value());

    //use the hex code for the stroke color
    // triangle("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255, 
    //         colorPicker.elt.color.rgb[1]*255, 
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    triangle(mouseX, mouseY, mouseX+-40, mouseY+60, mouseX+40, mouseY+60);

}

function sprayCan(){
    var sliderVal = slider.value();
    stroke( "#"+colorPicker.value() );

    //draw points in a grid that is the size of the brush slider
    //and draw those points 4 pixes from each other

    for (var x = 0; x < sliderVal; x+=4){
        for (var y = 0; y < sliderVal; y+=4){
            point(mouseX+x, mouseY+y);
        }
    }    
}

function drawApple(){
    //draw the image where the mouse is and set the size to the brush size
    image(apple,mouseX,mouseY, slider.value(), slider.value());
}

function drawChromy(){
    //draw the image where the mouse is and set the size to the brush size
    image(chromy,mouseX,mouseY, slider.value(), slider.value());
}

//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    brushType = brushPicker.value();
}

function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

function clearFunction() {
    clear();
    background("white");
}

function paintBucket() {
    background("#"+colorPicker.value());
}

function eraserBrush(){
    strokeWeight(slider.value());
    stroke("white");

    line(pmouseX, pmouseY, mouseX, mouseY);
}