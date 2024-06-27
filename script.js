


function BuildCanvas(ctx) {
    ctx.fillStyle="black";
    ctx.textAlign="center"

    for (var i = 1; i <=10; i++) {
        const y=i*50+30;
        ctx.fillText(i.toString(),30,y)
    }

    var letters = 'ABCDEFGHIJ';
    for (var i = 0; i < letters.length; i++) {
        const x = i * 50 + 70;
        ctx.fillText(letters[i].toString(), x, 40);
    }
      
        // Loop to draw multiple gride
    for (var i = 1; i <= 11; i++) {
        ctx.moveTo(50*i,50);
        ctx.lineTo(50*i,550);
        ctx.moveTo(50,50*i);
        ctx.lineTo(550,50*i);
    }
    ctx.stroke();  
}

function CheckInsideGride(rect) {
    let grid_left = 50;
    let grid_right = 550;
    let grid_top = 50;
    let grid_bottom = 550;

    // Check if the rectangle is inside the grid boundaries
    return (
        rect.x >= grid_left &&
        rect.x + rect.width <= grid_right &&
        rect.y >= grid_top &&
        rect.y + rect.height <= grid_bottom
    );
}

function BuildRect(ctx,rects,c_width,c_height){

    ctx.clearRect(0,0,c_width,c_height)
    BuildCanvas(ctx1);
    BuildCanvas(ctx2);
    
    rects.forEach(element => {
        ctx.fillStyle=element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });
    
}




        
var c1 = document.getElementById("myCanvas1");
var c2 = document.getElementById("myCanvas2");
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var rectsC1 = [
    { x: 50, y: 600, width: 50, height: 50, color:'blue' },
    { x: 150, y: 600, width: 50, height: 100,color:'blue' },
    { x: 250, y: 600, width: 150, height: 50,color:'blue' },
    { x: 450, y: 600, width: 100, height: 50,color:'blue' }
];
var rectsC2 = [
    { x: 50, y: 600, width: 50, height: 50,color:'red' },
    { x: 150, y: 600, width: 50, height: 100,color:'red' },
    { x: 250, y: 600, width: 150, height: 50,color:'red' },
    { x: 450, y: 600, width: 100, height: 50,color:'red' }
];

let c1_width=c1.width;
let c2_width=c2.width;
let c1_height=c1.height;
let c2_height=c2.height;
let is_dragging=false;
let startX;
let startY;
let current_shape_index;


let is_mouse_in_shape = function(x, y, rect) {
    const rectCanvas = c1.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const mouseX = x - rectCanvas.left;
    const mouseY = y - rectCanvas.top;

    // Check if the mouse is within the rectangle
    return (
        mouseX >= rect.x &&
        mouseX <= rect.x + rect.width &&
        mouseY >= rect.y &&
        mouseY <= rect.y + rect.height
    );
}

let mouse_down = function(event){
    event.preventDefault();
    console.log(event);

    startX = parseInt(event.clientX);
    startY = parseInt(event.clientY);

    let index=0;

    for (let rect of rectsC1){
        if(is_mouse_in_shape(startX,startY,rect)&& !CheckInsideGride(rect)){
            current_shape_index=index;
            console.log('yes');
            is_dragging=true;
            return;
        }
        else{
            console.log('no');
        }
        index++;
    }
}

let mouse_up=function(event){

    if(!is_dragging){
        return;
    }
    event.preventDefault();
    is_dragging=false;
    
}
let mouse_out=function(event){

    if(!is_dragging){
        return;
    }
    event.preventDefault();
    is_dragging=false;
    
}

let mouse_move=function(event){
    
    if(!is_dragging){
        return;
    }
    else{
        console.log('move');
        event.preventDefault();
        let mouse_x=parseInt(event.clientX);
        let mouse_y=parseInt(event.clientY);

        let new_x=mouse_x-startX;
        let new_y=mouse_y-startY;

        let curr_shape=rectsC1[current_shape_index];
        console.log(curr_shape.x);
        curr_shape.x+=new_x;
        curr_shape.y+=new_y;
        rectsC1[current_shape_index]=curr_shape;

        BuildRect(ctx1,rectsC1,c1_width,c1_height);
        console.log(curr_shape.x);
        startX=mouse_x;
        startY=mouse_y;
    }
}

c1.onmousedown=mouse_down;
c1.onmouseup=mouse_up;
c1.onmouseout=mouse_out;
c1.onmousemove=mouse_move;


BuildRect(ctx1,rectsC1,c1_width,c1_height)
BuildRect(ctx2,rectsC2,c2_width,c2_height)

