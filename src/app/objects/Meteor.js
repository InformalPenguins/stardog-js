/*
 * Meteor
 *
 * simple enemy
 */

import constants from '../data/constants.json';
import utils from '../utils.js'

let onKillEmitter;

export default class Meteor extends Phaser.Sprite {
  constructor(game, ...args) {
    super(game, ...args, 'characters', constants.SPRITE.METEOR);

    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.anchor.set(0.5);
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
    this.body.setSize(35, 35);
    this.scale.setTo(game.devicePixelRatio / 2, game.devicePixelRatio / 2);
  }

  update() {
    var gameSpeed = this.game.gameSpeed;
    if (!this.speed) {
      this.speed = utils.random(gameSpeed * 3, gameSpeed);
      this.rotationDirection = utils.random(1, 0) ? 1 : -1;
    }
    this.position.x -= this.speed;
    this.angle += this.rotationDirection * this.speed / 10;
  }

  reset() {
    this.speed = null;
    this.rotationDirection = null;

    Phaser.Sprite.prototype.reset.apply(this, arguments);
  }

  hit() {
    // killEmitter
    var emitterXSpeed = -this.speed * 30;
    emitterXSpeed = emitterXSpeed > -180 ? -180 : emitterXSpeed;

    onKillEmitter = this.game.add.emitter(this.x, this.y);
    onKillEmitter.makeParticles('characters', constants.SPRITE.SMOKE);
    onKillEmitter.gravity = 0;
    onKillEmitter.setXSpeed(emitterXSpeed, 50);
    onKillEmitter.setScale(0.8, 0, 0.8, 0, 1000);
    onKillEmitter.start(true, 1000, null, 8);

    // kill this
    this.kill();
  }
}
