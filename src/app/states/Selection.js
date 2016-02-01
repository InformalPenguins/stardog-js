/*
 * Selection state
 *
 * selection
 */

import constants from '../data/constants.json';

let slider;
let bkg01;
let bkg02;
let bkg03;

export default class Selection extends Phaser.State {
  preload() {
    slider = new phaseSlider(this);
  }

  create() {
    // background

    this.stage.backgroundColor = '#0B0B3B';

    bkg01 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background01');
    bkg02 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background02');
    bkg03 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background03');

    let block1 = this.add.image(0, 0, 'characters', constants.SPRITE.PLAYER);
    block1.scale.setTo(this.game.devicePixelRatio, this.game.devicePixelRatio);

    let block2 = this.add.image(0, 0, 'characters', constants.SPRITE.SHIP_SHIELD);
    block2.scale.setTo(this.game.devicePixelRatio, this.game.devicePixelRatio);

    let block3 = this.add.image(0, 0, 'characters', constants.SPRITE.PLAYER);
    block3.scale.setTo(this.game.devicePixelRatio, this.game.devicePixelRatio);

    slider.createSlider({
      //customSliderBG: bkg01,
      mode: 'horizontal',
      modal: true,
      width: 250,
      height: 250,
      x: this.world.centerX - 250 / 2,
      y: this.world.centerY - 250 / 2,
      objects: [block1, block2, block3]
    });
  }

  update() {
    // background
    bkg01.tilePosition.x -= 1 / 8;
    bkg02.tilePosition.x -= 1 / 4;
    bkg03.tilePosition.x -= 1 / 2;
  }
}
