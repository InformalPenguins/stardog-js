/*
 * AttackGroup
 *
 * a bunch of attacks
 */

import utils from '../utils'
import Attack from './Attack';

export default class AttackGroup extends Phaser.Group {
  constructor(game, ...args) {
    super(game, ...args);

    let createAnotherItem = 5;

    while (createAnotherItem--) {
      let newAttack = new Attack(this.game, 0, 0);
      this.add(newAttack);
      newAttack.kill();
    }
  }

  generate() {
    let attack = this.getFirstExists(false);
    let newX = this.game.world.width;
    let newY = utils.random(this.game.world.height);

    if (!attack) {
      attack = new Attack(this.game, newX, newY);
      this.add(attack);
    } else {
      attack.reset(newX, newY);
    }
  }
}
