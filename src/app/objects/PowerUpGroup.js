/*
 * PowerUpGroup
 *
 * a bunch of powerups
 */

import utils from '../utils'

import ShieldGroup from './ShieldGroup';
import AttackGroup from './AttackGroup';
import CrashGroup from './CrashGroup';

export default class PowerUpGroup {
  constructor(game, ...args) {
    this.game = game;
    this.shieldGroup = new ShieldGroup(game, ...args);
    this.attackGroup = new AttackGroup(game, ...args);
    this.crashGroup = new CrashGroup(game, ...args);
  }

  generate() {
    // TODO - all generate() are the same
    switch (utils.random(2, 0)) {
      case 0:
        this.shieldGroup.generate();
        break;
      case 1:
        this.attackGroup.generate();
        break;
      case 2:
        this.crashGroup.generate();
        break;
    }
  }

  renderDebug() {
    this.shieldGroup.forEachAlive(function (item) {
      this.game.debug.body(item);
    }, this);
    this.attackGroup.forEachAlive(function (item) {
      this.game.debug.body(item);
    }, this);
    this.crashGroup.forEachAlive(function (item) {
      this.game.debug.body(item);
    }, this);
  }
}
