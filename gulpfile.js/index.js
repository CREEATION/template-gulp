"use strict"

const get_tasks = require("../lib/gulp/get_tasks")
const tasks = get_tasks("./gulpfile.js/tasks")

// register tasks for gulp
for (const taskname in tasks) {
  if (Object.hasOwnProperty.call(tasks, taskname) || tasks[taskname]) {
    exports[taskname] = tasks[taskname]
  }
}
