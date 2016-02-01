/*
 * MeteorGroup
 *
 * a bunch of meteors
 */

import utils from '../utils.js'
import Meteor from './Meteor.js';

export default class MeteorGroup extends Phaser.Group {
  constructor(game, ...args) {
    super(game, ...args);

    let createAnotherMeteor = 10;

    while (createAnotherMeteor--) {
      let newMeteor = new Meteor(this.game, 0, 0);
      this.add(newMeteor);
      newMeteor.kill();
    }
  }

  generate() {
    let meteor = this.getFirstExists(false);
    let newX = this.game.world.width;
    let newY = utils.random(this.game.world.height);

    if (!meteor) {
      this.add(new Meteor(this.game, newX, newY));
    } else {
      meteor.reset(newX, newY);
    }
  }

  destroyAllAlive(callback, context) {
    this.forEachAlive(function renderGroup(meteor) {
      meteor.hit();
      callback.bind(context)();
    }, this);
  }
}
