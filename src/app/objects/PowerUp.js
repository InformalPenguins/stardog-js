/*
 * PowerUp
 *
 * bluff the player
 */

import utils from '../utils';
import constants from '../data/constants';

let onKillEmitter;

export default class PowerUp extends Phaser.Sprite {
  constructor(game, x, y, ...args) {
    super(game, x, y, ...args);

    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.anchor.set(0.5);
    this.scale.setTo(game.devicePixelRatio / 4, game.devicePixelRatio / 4);

    this.spawnY = y;
  }

  update() {
    let gameSpeed = this.game.gameSpeed;

    if (!this.speed) {
      this.speed = utils.random(gameSpeed, gameSpeed / 3);
    }

    this.position.x -= this.speed * 2;
    this.position.y = Math.sin(this.position.x / 100) * 100 + this.spawnY;

    if (this.position.x < 0) {
      this.kill();
    }
  }

  reset() {
    this.speed = null;
    Phaser.Sprite.prototype.reset.apply(this, arguments);
  }

  give() {
    // killEmitter
    onKillEmitter = this.game.add.emitter(this.x, this.y, 10);
    onKillEmitter.makeParticles('characters', constants.SPRITE.SMOKE);
    onKillEmitter.gravity = 0;
    onKillEmitter.setXSpeed(-100, 100);
    onKillEmitter.setYSpeed(-100, 100);
    onKillEmitter.setScale(0.3, 0, 0.3, 0, 1000);
    onKillEmitter.start(true, 1000, null, 10);

    // kill this
    this.kill(this);
  }
}
