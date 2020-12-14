"use strict"

module.exports = function gulp_config(config) {
  if (typeof config !== "object") {
    // get config instead
    return require("../../.gulp")
  }

  /**
   * gulp-cli configuration
   * @see https://github.com/gulpjs/gulp-cli#configuration
   */
  config.__gulp_cli = {
    description: config.name,
  }

  // merge gulp-cli configuration into config root
  for (const key in config.__gulp_cli) {
    if (Object.hasOwnProperty.call(config.__gulp_cli, key)) {
      config[key] = config.__gulp_cli[key]
    }
  }

  delete config.__gulp_cli

  return config
}
