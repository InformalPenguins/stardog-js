/*
 * The `app` module
 * ============================================================================
 *
 * This module provides the game initialization routine.
 */

// Required: import the Babel runtime module.
import 'babel-polyfill';

// Import game states.
import * as states from './app/states';

import achievements from './app/data/achievements';
import Stats from './app/stats';
import googleGames from './app/gg';

export function init() {
  const game = new Phaser.Game(640, 480, Phaser.CANVAS);

  // Dynamically add all required game states.
  Object.keys(states).forEach((key) => game.state.add(key, states[key]));

  game.stats = new Stats(achievements);
  game.googleGames = googleGames;
  game.state.start('Boot');

  return game;
}
