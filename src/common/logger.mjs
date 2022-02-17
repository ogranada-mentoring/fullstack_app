// Imports

export class Logger {
  /**
   * Escribe cositas
   * @param  {...any} args cositas
   */
  static log(...args) {
    global.console.log(...args);
  }

  static error(...args) {
    global.console.error(...args);
  }

  static warning(...args) {
    global.console.warn(...args);
  }
}

export default Logger;
