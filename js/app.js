// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; //property of Enemy

//assign starting x and y
    this.x = x;
    this.y = y;    
    this.speed= Math.floor(6 + (Math.random()*50));
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//Enemy.prototype.update needs to be written in such a way that every time update gets called our Enemy gets redrawn in a new position. 
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        
    //this.NewX=this.x+ dt/randomEnemySpeed()*100; // this speed is very choppy
    //this.NewX=this.x+100*dt; //constant but not random (boring)
    //this.NewX=this.speed;
    this.x=this.x+this.speed*dt*5; //redraw its x; keep y the same

    if(this.x > 500) //if off the screen
    {
         //go back 500 to beginning of screen (actually a little before)
         //this.x=this.NewX-500;
        this.x=-100;
        
        //reset the y to a random street row
        var yStartingPoints = [65, 150, 235]
        this.y = yStartingPoints[Math.round(Math.random() * (yStartingPoints.length - 1))];
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
//    console.log("Enemy this.sprite= " + this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//-------------------------- PLAYER -------------------------------

// Now write your own p{layer class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite='images/char-boy.png';
    //this.sprite='images/char-horn-girl.png';

//Assign the starting x and y
    this.x=x;
    this.y=y;    
}

Player.prototype.update = function() //pass dt as param?
{
    ///check for collision here!!!
    //update teh player status if there is a colision
    //(player.x > this.x-50 && player.x < this.x + 50))
    //console.log("B=" + this.x);
    
    //if player lands in water:
    if(this.y<40)
    {
        //go back to starting point
        this.x=100;
        this.y=320;
    }

    //Collision detection. Enemy can be: 1st row 65 1
    var i;
    for(i in allEnemies)
    {
        //if ( (allEnemies[i].y+20>this.y )  && (allEnemies[i].x === this.x)
        // this one was the hardest to figure out
        if (this.x <= allEnemies[i].x + 60  && this.x + 60 >= allEnemies[i].x && this.y === allEnemies[i].y)
        {
            console.log('Collision: Player x=' +this.x + '  y=' + this.y + '; BUG x=' + allEnemies[i].x + ' y=' + allEnemies[i].y);
            //back to starting point
            this.x=100;
            this.y=320;
        }    
    }
    

}

//render the player just like the enemies
Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input)
{
    console.log('BEFORE: x:'+this.x,'y:'+this.y);
    
    //x axis: must be 0 to 400  //can be 0, 100, 200, 300, 400
    if(input==='left')
    {
        if(this.x>0) //can't go off screen
        {
            //x go back 100
            this.x=this.x-100;
        }
        
    }
    if(input==='right')
    {
        if(this.x<400) //can't go off screen
            //go right 100
            this.x=this.x+100
    }

    //y axis: must be 85 to 400 (0 or less is water) // can be 0water 65road 150road 235road 320gras 405grass
    if(input==='up')
    {
        if(this.y>-1) // can't go off screen, water will kill him anyway
            this.y=this.y-85; //go up 85
    }
    if(input==='down')
    {
        if(this.y<401) //can't go off screen
        {
            this.y=this.y+85 // go down 85
        }
    }

 console.log('AFTER: x:'+this.x,'y:'+this.y);
}
// ------------------------ END PLAYER --------------------------------

//generate random speed between 50 and 100
//Math.random -> 0 and 1
//+ 1 -> between 1 and 2
//*50 -> between 50 and 100
function randomEnemySpeed()
{
    return  Math.random() * 10;
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies=[];
allEnemies[0]=new Enemy(65,65); 
allEnemies[1]=new Enemy(100,150); 
allEnemies[2]=new Enemy(10,235); 
allEnemies[3]=new Enemy(10,235); 

// Place the player object in a variable called player
var player = new Player(100, 320);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
