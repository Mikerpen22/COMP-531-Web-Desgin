
var lastLoopRun = 0;
var PLAYER_SPEED = 5;
var BLASTER_SPEED = 10;



function setPosition(actor){
    var e = document.getElementById(actor.element);
    e.style.left = actor.x_pos + 'px';
    e.style.top = actor.y_pos + 'px';
}


var controller = {
    right: false,
    left: false,
    down: false,
    top: false,
    fire: false,
}

function createObj(element, x_pos, y_pos, width, height){
    var your_obj = {
        element: element,
        x_pos: x_pos,
        y_pos: y_pos,
        width: width,
        height: height
    }
    return your_obj;
}

function toggleKey(whichKey, isPressed){
    console.log("updating controller on keypress", whichKey);

    if(whichKey == "ArrowLeft"){
        controller.left = isPressed;
    }
    else if(whichKey == "ArrowRight"){
        controller.right = isPressed;
    }
    else if(whichKey == "ArrowDown"){
        controller.down = isPressed;
    }
    else if(whichKey == "ArrowUp"){
        controller.top = isPressed;
    }
    else if(whichKey == 0 && blaster.y_pos <= 0){           // Check if mouse left key is pressed 
        controller.fire = isPressed;                        // Also only allow re-fire after the previous blaster goes out of screen
    }
    else if(whichKey == 0 && blaster.y_pos == 360){
        controller.fire = isPressed;
    }
}

function controlHandler(){
    // Handling the players movement
    if(player.x_pos + player.width >= screen.width){
        if(controller.top){          // Set by toggle key
            player.y_pos -= PLAYER_SPEED;
        }
        else if(controller.down){
            player.y_pos += PLAYER_SPEED;
        }
        else if (controller.left){
            player.x_pos -= PLAYER_SPEED;
        }
    }
    else if (player.x_pos == 0){
        if(controller.top){          // Set by toggle key
            player.y_pos -= PLAYER_SPEED;
        }
        else if(controller.down){
            player.y_pos += PLAYER_SPEED;
        }
        else if (controller.right){
            player.x_pos += PLAYER_SPEED;
            console.log(player.x_pos);
        }
    }
    else if(player.y_pos + player.height >= screen.height){
        if(controller.top){          // Set by toggle key
            player.y_pos -= PLAYER_SPEED;
        }
        else if (controller.right){
            player.x_pos += PLAYER_SPEED;
            console.log(player.x_pos);
        }
        else if (controller.left){
            player.x_pos -= PLAYER_SPEED;
        }
    }
    else if (player.y_pos == 0){
        if(controller.down){
            player.y_pos += PLAYER_SPEED;
        }
        else if (controller.right){
            player.x_pos += PLAYER_SPEED;
            console.log(player.x_pos);
        }
        else if (controller.left){
            player.x_pos -= PLAYER_SPEED;
        }
    }
    else{
        if(controller.top){          // Set by toggle key
            player.y_pos -= PLAYER_SPEED;
        }
        else if(controller.down){
            player.y_pos += PLAYER_SPEED;
        }
        else if (controller.right){
            player.x_pos += PLAYER_SPEED;
            console.log(player.x_pos);
        }
        else if (controller.left){
            player.x_pos -= PLAYER_SPEED;
        }
    }

    // Handling the blaster's initial position
    if(controller.fire){
        blaster.x_pos = player.x_pos + player.width / 2;
        blaster.y_pos = player.y_pos - blaster.height;
    }
    
}

function showActors(){
    setPosition(player);
    setPosition(blaster);
}

function updatePos(){
    // Update blaster's position after being fired
    console.log("updating blaster's postion...", blaster.y_pos, controller.fire);
    blaster.y_pos -= BLASTER_SPEED;
}

// main logic of game
// Called every 2 milli seconds
function gameLoop(){
    // console.log("in gameLoop...");
    if(Date.now() - lastLoopRun > 40){
        updatePos();
        controlHandler();
        showActors();
        lastLoopRun = Date.now();
    }
    setInterval(gameLoop, 2);
}


// When key pressed -> toggleKey updates controllers status
document.onkeyup = function(event){
    toggleKey(event.key, false);
}
document.onkeydown = function(event){
    toggleKey(event.key, true);
}
document.onmousedown = function(event){
    toggleKey(event.button, true);
}
document.onmouseup = function(event){
    toggleKey(event.button, false);
}


var player = createObj('player', 250, 400, 20, 20);
var blaster = createObj('blaster', 0, -120, 2, 40);

gameLoop();