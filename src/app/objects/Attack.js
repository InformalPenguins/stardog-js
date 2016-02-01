/*
 * Attack
 *
 * bluffs player
 */

import constants from '../data/constants';
import PowerUp from './PowerUp';

export default class Attack extends PowerUp {
  constructor(...args) {
    super(...args, 'characters', constants.SPRITE.FIRE);
  }

  give(player) {
    player.bluff('attack');
    PowerUp.prototype.give.call(this);
  }
}
