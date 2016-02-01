/*
 * Shield
 *
 * it's a fckng shield
 */

import constants from '../data/constants';
import PowerUp from './PowerUp';

export default class Shield extends PowerUp {
  constructor(...args) {
    super(...args, 'characters', constants.SPRITE.SHIELD);
  }

  give(player) {
    player.bluff('defense');
    PowerUp.prototype.give.call(this);
  }
}
