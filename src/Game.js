// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const controls = require('./keyboard');
const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
// const Boomerang = require('./game-models/Boomerang');
const View = require("./View");
const Boomerang = require("./game-models/Boomerang");
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
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(" ");
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
  }

  controls() {
    controls.runInteractiveConsole();
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.check();
      this.controls();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 500);
  }
}

module.exports = Game;

// const keyboard = {
//   a: () => this.boomerang.moveLeft(),
//   d: () => this.boomerang.moveRight(),
// };

// // Какая-то функция.

// function runInteractiveConsole() {
//   keypress(process.stdin);
//   process.stdin.on("keypress", (ch, key) => {
//     if (key) {
//       // Вызывает команду, соответствующую нажатой кнопке.
//       if (key.name in keyboard) {
//         keyboard[key.name]();
//       }
//       // Прерывание программы.
//       if (key.ctrl && key.name === "c") {
//         process.exit();
//       }
//     }
//   });
//   process.stdin.setRawMode(true);
// }

// // Давай попробуем запустить этот скрипт!

// runInteractiveConsole();
