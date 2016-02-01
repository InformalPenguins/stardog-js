/*
 * CrashGroup
 *
 * a bunch of crashes
 */

import utils from '../utils'
import Crash from './Crash';

export default class CrashGroup extends Phaser.Group {
  constructor(game, ...args) {
    super(game, ...args);

    let createAnotherItem = 5;

    while (createAnotherItem--) {
      let newCrash = new Crash(this.game, 0, 0);
      this.add(newCrash);
      newCrash.kill();
    }
  }

  generate() {
    let crash = this.getFirstExists(false);
    let newX = this.game.world.width;
    let newY = utils.random(this.game.world.height);

    if (!crash) {
      crash = new Crash(this.game, newX, newY);
      this.add(crash);
    } else {
      crash.reset(newX, newY);
    }
  }
}
