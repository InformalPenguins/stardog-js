/*eslint-disable no-unused-vars*/

/*
 * Player
 */

import constants from '../data/constants.json';
import Bullet from './Bullet.js';

let fireEmitter;
let onKillEmitter;
let shield;
let attackTimer;
let isGameStarted;
let attackDurationTimer;
let crashWave;
let crashWaveSize;

export default class Player extends Phaser.Sprite {
  constructor(game, ...args) {
    super(game, ...args, 'characters', constants.SPRITE.PLAYER);

    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.anchor.set(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.body.setSize(30, 20);
    this.scale.setTo(game.devicePixelRatio / 2, game.devicePixelRatio / 2);

    fireEmitter = game.add.emitter(this.x - this.x / 4, this.y, 10);
    fireEmitter.makeParticles('characters', [
      constants.SPRITE.FIRE1,
      constants.SPRITE.FIRE2,
      constants.SPRITE.FIRE3,
      constants.SPRITE.SMOKE
    ]);
    fireEmitter.gravity = 0;
    fireEmitter.setXSpeed(-100, -50);
    fireEmitter.setYSpeed(-50, 50);
    fireEmitter.setAlpha(1, 0, 2000);
    fireEmitter.setScale(0.5, 0.2, 0.5, 0.2, 2000);
    fireEmitter.start(false, 2000);

    this.bringToTop();

    /**
     * direction
     * 0: up
     * 1: down
     */
    this.direction = 1;
    this.hasDied = new Phaser.Signal();

    // bluffs
    this.epicAttack = new Phaser.Signal();
    this.hasDestroyedShield = new Phaser.Signal();
    this.hasAttack = false;
    this.hasCrash = false;
    this.hasShield = false;
    this.bulletsGroup = game.add.group();
    shield = game.add.graphics(100, 100);
    crashWave = game.add.graphics(100, 100);
    attackTimer = game.time.events.loop(250, this.attack, this);

    // other
    isGameStarted = false;
  }

  kill(byHit) {
    // event
    this.hasDied.dispatch(this, byHit);

    // killEmitter
    onKillEmitter = this.game.add.emitter(this.x, this.y);
    onKillEmitter.makeParticles('characters', [
      constants.SPRITE.FIRE1,
      constants.SPRITE.FIRE2,
      constants.SPRITE.FIRE3,
      constants.SPRITE.SMOKE
    ]);
    onKillEmitter.gravity = 0;
    onKillEmitter.setScale(0.8, 0.1, 0.8, 0.1, 2000);
    onKillEmitter.start(true, 2000, null, 30);

    // others
    this.nerf('shield');
    this.nerf('attack');

    // kill this
    fireEmitter.kill();
    Phaser.Sprite.prototype.kill.call(this);
  }

  update() {
    if (!isGameStarted) {
      return;
    }

    let gameSpeed = this.game.gameSpeed;
    let speed = gameSpeed * 1;

    if (this.direction) {
      this.position.y += speed > constants.PLAYER.MAX_SPEED ? constants.PLAYER.MAX_SPEED : speed;
      this.angle += this.angle < 10 ? 3 : 0;
    } else {
      this.position.y -= speed > constants.PLAYER.MAX_SPEED ? constants.PLAYER.MAX_SPEED : speed;
      this.angle -= this.angle > -10 ? 3 : 0;
    }

    fireEmitter.emitX = this.x - 25;
    fireEmitter.emitY = this.y;

    // bluffs

    if (this.hasShield) {
      shield.x = this.x;
      shield.y = this.y;
    } else {
      shield.clear(); // TODO - possible memory leakage
    }

    if (this.hasCrash) {
      crashWaveSize += 100;
      crashWave.x = this.x;
      crashWave.y = this.y;
      crashWave.lineStyle(this.game.scaleRatio * 4, 0xffff00);
      crashWave.beginFill(0xffff00, 0.1);
      crashWave.drawCircle(0, 0, crashWaveSize);
      crashWave.endFill();

      if (crashWaveSize > this.game.world.width) {
        this.nerf('crash');
      }
    }
  }

  start() {
    isGameStarted = true;
  }

  toggle() {
    this.direction = !this.direction;
    //stats.taps++;
  }

  hit() {
    if (this.hasShield) {
      this.nerf('defense');
      this.hasDestroyedShield.dispatch(this);
    } else {
      this.kill(true);
    }
  }

  bluff(type) {
    switch (type) {
      case 'defense':
        if (this.hasShield) {
          break;
        }
        this.hasShield = true;
        shield.x = this.x;
        shield.y = this.y;
        shield.lineStyle(0);
        shield.beginFill(0x66FFCC, 0.3);
        shield.drawCircle(0, 0, 80);
        shield.endFill();
        break;
      case 'attack':
        if (this.hasAttack) {
          this.nerf('attack');
        }
        this.hasAttack = true;
        attackDurationTimer = this.game.time.events.add(Phaser.Timer.SECOND * 3, function () {
          this.nerf('attack');
        }, this);
        this.game.time.events.start(attackDurationTimer);
        break;
      case 'crash':
        this.hasCrash = true;
        crashWaveSize = 150;
        this.epicAttack.dispatch(this);
        break;
    }
  }

  nerf(type) {
    switch (type) {
      case 'defense':
        this.hasShield = false;
        break;
      case 'attack':
        this.hasAttack = false;
        this.game.time.events.remove(attackDurationTimer);
        break;
      case 'crash':
        this.hasCrash = false;
        crashWave.clear();
        break;
    }
  }

  attack() {
    if (!this.hasAttack) {
      return;
    }

    var bullet = this.bulletsGroup.getFirstExists(false);

    if (!bullet) {
      bullet = new Bullet(this.game, this.x, this.y);
      this.bulletsGroup.add(bullet);
    } else {
      bullet.revive();
      bullet.reset(this.x, this.y);
    }
  }
}
