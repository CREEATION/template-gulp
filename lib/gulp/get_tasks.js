"use strict"

const fs = require("fs")
const path = require("path")

const require_folder = require("require-folder")

const gulp_config = require("./config")
const subtasks_delimeter = gulp_config().options.subtasks_delimeter

/**
 * registers optional tasks defined in a task, e.g. "clean" or "watch"
 * @param {Object} tasks gulp tasks object
 * @param {String} name name for optional task
 */
const register_optional_tasks = function (tasks, name) {
  for (const taskname in tasks) {
    if (Object.hasOwnProperty.call(tasks[taskname], name)) {
      // register optional task
      tasks[`${taskname}${subtasks_delimeter}${name}`] = tasks[taskname][name]
    }
  }
}

/**
 * traverses the gulpfile directory and returns all found tasks
 * @param {String} tasks_path path to root of tasks files
 */
module.exports = function get_tasks(tasks_path) {
  let tasks = require_folder(tasks_path)
  const subtasks = require_folder(tasks_path, {
    exclude: ["index.js"],
  })

  for (const taskname in subtasks) {
    const subtasks_folder = path.join(tasks_path, taskname)

    if (Object.hasOwnProperty.call(subtasks, taskname)) {
      if (fs.existsSync(subtasks_folder)) {
        const task_folder = subtasks[taskname]

        for (const subtaskname in task_folder) {
          if (Object.hasOwnProperty.call(task_folder, subtaskname)) {
            const subtask_displayname = `${taskname}${subtasks_delimeter}${subtaskname}`
            subtasks[subtask_displayname] = subtasks[taskname][subtaskname]
          }
        }
      }

      delete subtasks[taskname]
    }
  }

  tasks = Object.assign(tasks, subtasks)

  register_optional_tasks(tasks, "clean")
  register_optional_tasks(tasks, "watch")

  return tasks
}
