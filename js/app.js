// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary =  this.step * 5;
    this.resetPos = -this.step;
};
//************************************************************************************************************************************************************************************//
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary

    if(this.x < this.boundary) {
        
        // Move forward
        // Increment x by speed * dt

        this.x += this.speed * dt;
    }
    else {

        // Reset pos to start

        this.x = this.resetPos;
    }       
};

//************************************************************************************************************************************************************************************//
// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//************************************************************************************************************************************************************************************//
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player controlled character
class Hero  {
    constructor() {
        this.sprite = 'images/char-cat-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        this.lives = 3;
    }
//************************************************************************************************************************************************************************************//
    // Update position
    update() {

        // Access enemies 
        for(let enemy of allEnemies) {
           
            // Check for collision
            // Subtract one life if hit
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
                this.lives -=1;

        }
        // Reset lives and player position
            if (this.lives <= 0) {
                    this.resetLives();
                    this.reset();
            }    
        }
         // Player wins if they reach the water with more than one life
            if(this.y === 55 && this.lives > 0) {
                player.victory = true;
                this.resetLives();
          }
        }  
//************************************************************************************************************************************************************************************//
    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
//************************************************************************************************************************************************************************************//

    /**
     * Update hero's x and y property according to input
     * 
     * @param  {string} input - Direction to travel
     */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }
    //************************************************************************************************************************************************************************************//
    //Reset playerLives
    resetLives(){
        this.lives = 3;
    } 
     //************************************************************************************************************************************************************************************//          
    // Reset hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.X = this.startX;
    }
        
}   
//************************************************************************************************************************************************************************************//
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 83, 250);     
const bug2 = new Enemy(-101,166, 300);
const bug3 = new Enemy((-101*2.5), 0, 350);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);
//************************************************************************************************************************************************************************************//

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