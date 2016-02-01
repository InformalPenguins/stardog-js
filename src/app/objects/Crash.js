/*
 * Crash
 *
 * bluffs player
 */

import constants from '../data/constants';
import PowerUp from './PowerUp';

export default class Crash extends PowerUp {
  constructor(...args) {
    super(...args, 'characters', constants.SPRITE.CRASH);
  }

  give(player) {
    player.bluff('crash');
    PowerUp.prototype.give.call(this);
  }
}
