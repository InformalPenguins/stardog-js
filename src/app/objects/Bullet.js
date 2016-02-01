/*
 * Bullet
 *
 * A simple bullet
 */

import constants from '../data/constants.json';

let onKillEmitter;

export default class Bullet extends Phaser.Sprite {
  constructor(game, ...args) {
    super(game, ...args, 'characters', constants.SPRITE.BULLET);

    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.anchor.set(0.5);
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
    this.scale.setTo(game.devicePixelRatio / 4, game.devicePixelRatio / 4);
  }

  update() {
    this.position.x += 8;
  }

  hit() {
    // kill emitter
    onKillEmitter = this.game.add.emitter(this.x + this.width, this.y, 10);
    onKillEmitter.makeParticles('characters', constants.SPRITE.BULLET);
    onKillEmitter.setXSpeed(-20, 400);
    onKillEmitter.setScale(0.8, 0, 0.8, 0, 1000);
    onKillEmitter.start(true, 1000, null, 8);

    // kill this
    this.kill();
  }
}
