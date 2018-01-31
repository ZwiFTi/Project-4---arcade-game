/**
* @description Represent the enemies player must avoid in game.
* @constructor
*/
class Enemy {
  constructor() {
    this.x = -100;
    this.y = Math.random() * 184 + 50;
    this.speed = Math.random() * 350;
    this.maxDistanceX = 500;
    this.sprite = 'images/enemy-bug.png';
  }

  /**
  * @description Sets restrictions on enemy movement and does something if reached:
  * 1. Starts over again
  * 2. Resets speed
  * 3. Resets y-position
  */
  distanceRestrictions() {
    if (this.x >= this.maxDistanceX) {
      this.x = -100
      this.y = Math.random() * 184 + 50;
      this.speed = Math.random() * 350;
    }
  }

  /**
  * @description Update the enemy's position, distance restrictions and collisions
  * @param {integer} dt - A time delta between ticks
  */
  update(dt) {
    this.x += this.speed * dt;
    this.distanceRestrictions();
    this.collide(player);
  }

  /**
  * @description Draw the enemy on the screen
  */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
  * @description Does something if player collide with enemy
  * 1. Resets player to start position
  * 2. Resets win-count
  * @param {object} playerObj - An instance of a player
  */
  collide(playerObj) {
    if (
    playerObj.y + 131 >= this.y + 90
    && playerObj.x + 25 <= this.x + 88
    && playerObj.y + 73 <= this.y + 135
    && playerObj.x + 76 >= this.x + 11) {
      playerObj.x = 202.5;
      playerObj.y = 483;
      playerObj.wins = 0;
      document.querySelector('.wincount').innerHTML = "Wins: " + playerObj.wins;
      }
    }
}


/**
* @description Represent the player.
* @constructor
*/
class Player {
  constructor() {
    this.x = 202.5;
    this.y = 483;
    this.speed = 100;
    this.maxDistanceY = 383;
    this.maxDistanceX = 402.5;
    this.minDistanceX = 2.5;
    this.sprite = 'images/char-boy.png';
    this.wins = 0;
  }

  /**
  * @description Stops player if trying to walk past border
  */
  distanceRestrictions() {
    (this.x > this.maxDistanceX) ? this.x = this.maxDistanceX : this.x;
    (this.x < this.minDistanceX) ? this.x = this.minDistanceX : this.x;
    (this.y > this.maxDistanceY) ? this.y = this.maxDistanceY : this.y;
  }

  /**
  * @description Update's player data if winning condition is met
  */
  updateIfWin() {
    if (this.y + 63 <= 0) {
      this.x = 202.5;
      this.y = 483;
      this.wins += 1;
      document.querySelector('.wincount').innerHTML = "Wins: " + this.wins;
    }
  }

  /**
  * @description Update the player's position, distance restrictions and winning conditions
  */
  update() {
    this.distanceRestrictions();
    this.updateIfWin();
  }

  /**
  * @description Draw the player on the screen
  */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
  * @description Handler for key inputs
  * @param {string} key - Recorded keystrokes for player movements
  */
  handleInput(key) {
    console.log(key);
    switch(key) {
      case 'left':
        this.x -= this.speed;
        break;
      case 'up':
        this.y -= this.speed - 20;
        break;
      case 'right':
        this.x += this.speed;
        break;
      case 'down':
        this.y += this.speed - 20;
        break;
    }
  }
}

const bug1 = new Enemy();
const bug2 = new Enemy();
const bug3 = new Enemy();

const allEnemies = [bug1, bug2, bug3];
const player = new Player();

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
