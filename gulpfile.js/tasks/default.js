"use strict"

function defaultTask(cb) {
  // place code for your default task here
  console.log("default task!")

  cb()
}

module.exports = defaultTask
