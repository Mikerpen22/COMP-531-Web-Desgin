
// Defining some frequently used variables
var lastLoopRun = 0;
var PLAYER_SPEED = 5;
var BLASTER_SPEED = 10;
var MAX_WIDTH = window.screen.width;
var MAX_HEIGHT = window.screen.height;
var score = 0;



function setPosition(actor){
    var e = document.getElementById(actor.element);
    e.style.left = actor.x_pos + 'px';
    e.style.top = actor.y_pos + 'px';
}

var enemies  = [];      // Keep a list of enemies

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
    // console.log("updating controller on keypress", whichKey);

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
    else if(whichKey == 0 && blaster.y_pos == player.y_pos-40){
        controller.fire = isPressed;
    }
}

function checkCollision(){
    for(var i = 0; i < enemies.length; i++){
        if(intersects(enemies[i], blaster)){ 
            
            // Select element and remove it from DOM & enemies array
            var element = document.getElementById(enemies[i].element);
            element.style.visibility = "hidden";
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);   // Remove this enemy from enemies arr w/ splice(start, deleteCount)
            i--;    // decrease i by 1 otherwise the loop will skip one index
            
            // Also make sure the blaster doesn't keep going after hitting target
            blaster.y_pos = -blaster.height;
        }
        else if(intersects(enemies[i], player)){
            var element = document.getElementById(player.element);
            element.style.visibility = "hidden";
        }
        // Also remove enemy if its out of screen
        else if(enemies[i].y_pos + enemies[i].height >= MAX_HEIGHT-145){
            var element = document.getElementById(enemies[i].element);
            element.style.visibility = "hidden";
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);   
            i--;    // decrease i by 1 otherwise the loop will skip one index
        }
    }
}

function intersects(obj1, obj2){
    return obj1.x_pos < obj2.x_pos + obj2.width && obj1.x_pos + obj1.width > obj2.x_pos && obj1.y_pos < obj2.y_pos + obj2.height && obj1.y_pos + obj1.height > obj2.y_pos 
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
            // console.log(player.x_pos);
        }
    }
    else if(player.y_pos + player.height >= screen.height){
        if(controller.top){          // Set by toggle key
            player.y_pos -= PLAYER_SPEED;
        }
        else if (controller.right){
            player.x_pos += PLAYER_SPEED;
            // console.log(player.x_pos);
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
            // console.log(player.x_pos);
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

    // Handling enemies collision with the boundaries
    for(var i = 0; i < enemies.length; i++){
        if(enemies[i].x_pos < 10){
            enemies[i].x_pos = 10;
        }
        if(enemies[i].x_pos + enemies[i].width > MAX_WIDTH){
            enemies[i].x_pos = MAX_WIDTH - enemies[i].width;
        }
    }
    
}

function showActors(){
    setPosition(player);
    setPosition(blaster);
    for(var i = 0; i < enemies.length; i++){
        setPosition(enemies[i]);
    }

    $("#score").innerHTML = "SCORE: " + score;
}

function updatePos(){
    // Update blaster's position after being fired
    // console.log("updating blaster's postion...", blaster.y_pos, controller.fire);
    blaster.y_pos -= BLASTER_SPEED;

    // Update enemies position
    for (var i = 0; i < enemies.length; i++){
        enemies[i].y_pos += getRandomInt(5);
        enemies[i].x_pos += getRandomInt(5) - 2;
    }

}

function getRandomInt(max){
    return Math.floor(Math.random() * max);     // Generate random num between 0-49
}

function createEnemies(){
    if(getRandomInt(50) == 0){
        let elementStr = 'enemy' + getRandomInt(Number.MAX_SAFE_INTEGER);      // Name of element should not collide
        var enemy = createObj(elementStr, getRandomInt(window.screen.width), -40, 35, 35);
        
        // To show enemies on screen, still need to create display elements in DOM
        var element = document.createElement("div");
        element.id = enemy.element;
        element.className = "enemy";
        document.children[0].appendChild(element);
        enemies[enemies.length] = enemy;
    }
}


// main logic of game
// Called every 2 milli seconds
function gameLoop(){
    // console.log("in gameLoop...");
    if(Date.now() - lastLoopRun > 50){
        updatePos();
        controlHandler();
        checkCollision();
        
        createEnemies();
        showActors();
        lastLoopRun = Date.now();
    }
    setInterval(gameLoop, 10);
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



var player = createObj('player', MAX_WIDTH/2, MAX_HEIGHT-150, 20, 20);
var blaster = createObj('blaster', 0, -120, 2, 40);

gameLoop();