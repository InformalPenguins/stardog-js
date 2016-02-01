/**
 * Menu state
 */

let playButton;
let loginButton;

export default class Menu extends Phaser.State {
  init() {
    // TODO: Stub
  }

  preload() {
    // TODO: Stub
  }

  create() {
    playButton = this.add.bitmapText(this.world.centerX, this.world.centerY, 'gem', 'Play', 36);
    playButton.anchor.set(0.5);

    playButton.inputEnabled = true;
    playButton.events.onInputUp.add(function () {
      this.state.start('Game');
    }.bind(this));

    loginButton = this.add.bitmapText(this.world.centerX, this.world.centerY + 72, 'gem', 'Login', 36);
    loginButton.anchor.set(0.5);
    loginButton.visible = false;

    loginButton.inputEnabled = true;
    loginButton.events.onInputUp.add(function () {
      this.game.googleGames.tryLogIn();
    }.bind(this));
  }

  update() {
    loginButton.visible = !this.game.googleGames.signedIn;
  }

  render() {
    // TODO: Stub
  }
}
