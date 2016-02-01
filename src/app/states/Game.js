/**
 * Game state
 */

import constants from '../data/constants.json';

import Player from '../objects/Player';
import MeteorGroup from '../objects/MeteorGroup';
import PowerUpGroup from '../objects/PowerUpGroup';

let scoreTimer;
let difficultyTimer;
let meteorGroup;
let meteorGenerationTimer;
let powerUpGroup;
let powerUpGenerationTimer;
let player;
let bkg01;
let bkg02;
let bkg03;
let splashText;
let scoreText;

export default class Game extends Phaser.State {

  create() {
    // game control
    this.score = 0;
    this.game.gameSpeed = 1;

    difficultyTimer = this.time.events.loop(Phaser.Timer.SECOND * 15, this.increaseDifficulty, this);
    scoreTimer = this.time.events.loop(Phaser.Timer.SECOND, this.increaseScore, this);

    // background
    this.stage.backgroundColor = '#0B0B3B';
    bkg01 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background01');
    bkg02 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background02');
    bkg03 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background03');

    // splash text
    let text = this.game.device.desktop ? 'Click' : 'Touch';
    text += ' to start!';

    splashText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'gem', text, 32);
    splashText.anchor.set(0.5);

    // score text
    scoreText = this.add.bitmapText(this.world.centerX, parseInt(this.world.height / 10, 10), 'gem', this.score + '', 32);
    scoreText.anchor.set(0.5);
    scoreText.visible = false;

    // player
    player = new Player(this.game, this.world.width / 6, this.world.centerY);
    player.hasDied.add(this.shutdown, this);
    player.epicAttack.add(this.destroyAllEnemies, this);
    player.hasDestroyedShield.add(this.shieldDestroyed, this);

    // input
    this.input.onDown.add(this.action, this);
    this.input.onDown.addOnce(this.startGame, this);

    // meteors & power ups
    meteorGroup = new MeteorGroup(this.game);
    powerUpGroup = new PowerUpGroup(this.game);

    powerUpGenerationTimer = this.time.events.loop(Phaser.Timer.SECOND * 8, this.generatePowerUp, this);
    meteorGenerationTimer = this.time.events.loop(250, this.generateMeteor, this);

    this.time.events.pause();

    // hacks
    //powerUpsGroup.add(new Crash(this.game, 500, 500));
    //player.hasAttack = true;
    //new Meteor(this.game, this.world.centerX, this.world.centerY);
  }

  update() {
    // background
    bkg01.tilePosition.x -= this.game.gameSpeed / 8;
    bkg02.tilePosition.x -= this.game.gameSpeed / 4;
    bkg03.tilePosition.x -= this.game.gameSpeed / 2;

    let enemyTime = 3000 - this.game.gameSpeed * 500;
    meteorGenerationTimer.delay = enemyTime < constants.ENEMY.MIN_SPAWN_TIME ? constants.ENEMY.MIN_SPAWN_TIME : enemyTime;

    // collisions
    this.physics.arcade.overlap(player, meteorGroup, function (player, enemy) {
      player.hit(enemy);
      enemy.hit();
    }, null, this);

    this.physics.arcade.overlap(player, [
      powerUpGroup.shieldGroup,
      powerUpGroup.attackGroup,
      powerUpGroup.crashGroup
    ], function (player, powerUp) {
      powerUp.give(player);
      this.increaseScore();
      this.game.stats.powerUpsTaken++;
    }, null, this);

    this.physics.arcade.overlap(player.bulletsGroup, meteorGroup, function (bullet, meteor) {
      bullet.hit();
      meteor.hit();
      this.increaseScore();
      this.game.stats.meteorsKilled++;
    }, null, this);

    // score
    scoreText.setText(this.score);
  }

  //render() {
  //  if (!this.game._debug) {
  //    return;
  //  }
  //
  //  var game = this.game;
  //
  //  game.debug.bodyInfo(player, 32, 32);
  //  game.debug.body(player);
  //
  //  powerUpGroup.renderDebug();
  //}

  action() {
    player.toggle();
    this.game.stats.taps++;
    //this.game.stats.increase('taps');
  }

  startGame() {
    splashText.destroy();
    scoreText.visible = true;

    player.start();

    this.game.stats.runs++;
    this.time.events.resume();
  }

  generateMeteor() {
    meteorGroup.generate();
  }

  generatePowerUp() {
    powerUpGroup.generate();
  }

  increaseDifficulty() {
    this.game.gameSpeed += 1;
  }

  increaseScore() {
    this.score += 1;
  }

  shutdown(player, byHit) {
    // no more moves
    this.input.onDown.remove(this.action, this);

    // register death
    this.game.stats.deaths++;

    // stop timers!
    this.time.events.remove(scoreTimer);
    this.time.events.remove(difficultyTimer);
    this.time.events.remove(meteorGenerationTimer);
    this.time.events.remove(powerUpGenerationTimer);

    // text
    let text = byHit ? 'You\'ve crashed' : 'Your ship is lost';

    splashText = this.add.bitmapText(this.world.centerX, this.world.centerY, 'gem', text, 32);
    splashText.anchor.set(0.5);

    // restart
    this.time.events.add(500, function () {
      this.input.onDown.add(function () {
        this.state.start('Game');
      }, this);
    }, this);

    //this.game.time.events.add(Phaser.Timer.SECOND * 3, function () {
    //  console.log('restart?');
    //  this.state.start('Game'); // TODO - REFACTOR ALL THIS !!
    //}, this);

    //var text;

    //if (this.score > stats.bestScore) {
    //  text = this.score + '\nNew Best!';
    //  stats.bestScore = this.score;
    //} else {
    //  text = this.score + '\nYour best was ' + stats.bestScore;
    //}

    //scoreText.setText(text);

    //stats.currentCredit += this.score;
    //stats.globalScore += this.score;
    this.game.stats.save();
  }

  destroyAllEnemies() {
    meteorGroup.destroyAllAlive(function () {
      this.increaseScore();
    }, this);
  }

  shieldDestroyed() {
    this.game.stats.shieldsDestroyed++;
  }
}
