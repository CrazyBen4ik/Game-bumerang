// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = Math.floor(Math.random() * 30);
  }

  generateSkin() {
    const skins = [
      "👾",
      "💀",
      "👹",
      "👻",
      "👽",
      "👿",
      "💩",
      "🤡",
      "🤺",
      "🧛",
      "🧟",
      "🎃",
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = "?";
    this.skin = "💀";
    console.log("Enemy is dead!");
  }
}

module.exports = Enemy;
