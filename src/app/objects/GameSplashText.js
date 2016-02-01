/*
 * SplashText
 *
 * it's text
 */


export default class GameSplashText extends Phaser.BitmapText {
  constructor(game, ...args) {
    super(game, ...args);

    var text = game.device.desktop ? 'Click' : 'Touch';
    text += ' to start!';

    splashText = this.add.bitmapText(game.world.centerX, game.world.centerY, 'gem', text, 32);
    splashText.anchor.set(0.5);
  }
}
