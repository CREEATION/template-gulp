"use strict"

const gulp_config = require("./lib/gulp/config")
const pkg = require("./package.json")

module.exports = gulp_config({
  name: pkg.name,
  options: {
    subtasks_delimeter: ":",
    logging: {
      debug: true,
      verbose: true,
    },
  },
})
