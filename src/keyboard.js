const keypress = require("keypress"); // библ

const runInteractiveConsole = (keyboard) => {
  keypress(process.stdin);
  process.stdin.on("keypress", (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === "c") {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
};

module.exports = runInteractiveConsole;
