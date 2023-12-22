// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
// const Boomerang = require('./game-models/Boomerang');
const View = require("./View");
const Boomerang = require("./game-models/Boomerang");
const runInteractiveConsole = require("./keyboard");

// const keypress = require("keypress");
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0 }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View(this);
    this.boomerang = new Boomerang();
    this.track = [];
    this.regenerateTrack();
    this.setupControls();
    this.count = 0;
  }

  setupControls() {
    const keyboard = {
      // q: () => console.log("q"),
      // w: () => console.log("w"),
      // e: () => console.log("e"),
      // r: () => console.log("r"),
      // t: () => console.log("t"),
      // y: () => console.log("y"),
      a: () => {
        this.boomerang.moveLeft();
        this.check();
        this.regenerateTrack();
        this.view.render(this.track);
      },
      d: () => {
        this.boomerang.moveRight();
        this.check();
        this.regenerateTrack();
        this.view.render(this.track);
      },
    };

    runInteractiveConsole(keyboard, this.count); // Передаем объект управления и Boomerang
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(" ");
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
  }

  check() {
    if (this.boomerang.position === this.enemy.position) {
      console.log(this.count);
      this.count += 1;
      this.boomerang.position = 0;
      this.enemy.die();
      this.enemy = new Enemy();
    }
  }

  play() {
    // setInterval(() => {
    // Let's play!
    this.check();
    this.regenerateTrack();
    this.view.render(this.track);
    this.setupControls();
    // }, 500);
  }
}

module.exports = Game;
