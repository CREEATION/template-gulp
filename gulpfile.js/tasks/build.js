"use strict"

function buildTask(cb) {
  // place code for your build task here
  console.log("build task!")

  cb()
}

module.exports = buildTask
