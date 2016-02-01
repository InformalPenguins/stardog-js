/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 *
 */


export default {

  // - Boot Assets ------------------------------------------------------------
  boot: [
    {
      key: 'splash-screen',
      type: 'image'
    },

    {
      key: 'progress-bar',
      type: 'image'
    }
  ],

  // - Game assets ------------------------------------------------------------
  game: [
    {
      "type": "bitmapFont",
      "key": "gem",
      "textureURL": "gem.png",
      "atlasURL": "gem.xml",
      "atlasData": null,
      "xSpacing": 0,
      "ySpacing": 0
    },
    {
      type: 'image',
      key: 'background01'
    },
    {
      type: 'image',
      key: 'background02'
    },
    {
      type: 'image',
      key: 'background03'
    },
    {
      type: 'spritesheet',
      key: 'characters',
      frameWidth: 48,
      frameHeight: 48,
      frameMax: 12
    }

    // Example: adding a background music.
    // {
    //   key: 'tune',
    //   type: 'audio',
    //   urls: [ 'tune.oga', 'tune.m4a' ]
    // }

    // Example: adding a audio sprite containing sound effects.
    // {
    //   key: 'sfx',
    //   type: 'audiosprite',
    //   urls: [ 'sfx.m4a' ],
    //   jsonURL: 'sfx.json'
    // }

    // Example: spritesheet
    // {
    //   "type": "spritesheet",
    //   "key": "mummy",
    //   "url": "assets/sprites/metalslug_mummy37x45.png",
    //   "frameWidth": 37,
    //   "frameHeight": 45,
    //   "frameMax": 18,
    //   "margin": 0,
    //   "spacing": 0
    // }

    // Moar: http://examples.phaser.io/assets/asset-pack1.json
  ]

};
