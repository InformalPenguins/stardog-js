/*
 * The `states` module
 * ============================================================================
 *
 * A module declaring all game states present. Expose all required game
 * states using this module.
 */

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import MenuState from './states/Menu';
import GameState from './states/Game';
import SelectionState from './states/Selection';

const Boot = BootState;
const Preload = PreloadState;
const Menu = MenuState;
const Game = GameState;
const Selection = SelectionState;

export {Boot};
export {Preload};
export {Menu};
export {Game};
export {Selection};

// Uncomment this when webstorm stops sucking...
//export { default as Boot    } from './states/Boot';
//export { default as Preload } from './states/Preload';
//export { default as Game    } from './states/Game';
