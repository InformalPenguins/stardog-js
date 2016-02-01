/*
 * ShieldGroup
 *
 * a bunch of shields
 */

import utils from '../utils'
import Shield from './Shield';

export default class ShieldGroup extends Phaser.Group {
  constructor(game, ...args) {
    super(game, ...args);

    let createAnotherItem = 5;

    while (createAnotherItem--) {
      let newShield = new Shield(this.game, 0, 0);
      this.add(newShield);
      newShield.kill();
    }
  }

  generate() {
    let shield = this.getFirstExists(false);
    let newX = this.game.world.width;
    let newY = utils.random(this.game.world.height);

    if (!shield) {
      shield = new Shield(this.game, newX, newY);
      this.add(shield);
    } else {
      shield.reset(newX, newY);
    }
  }
}
