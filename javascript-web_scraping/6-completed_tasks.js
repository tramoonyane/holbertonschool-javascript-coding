#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Error: Status code ${response.statusCode}`);
    return;
  }

  const todos = JSON.parse(body);
  const completedTasksByUser = {};

  todos.forEach(todo => {
    if (todo.completed) {
      if (!completedTasksByUser[todo.userId]) {
        completedTasksByUser[todo.userId] = 1;
      } else {
        completedTasksByUser[todo.userId]++;
      }
    }
  });

  Object.keys(completedTasksByUser).forEach(userId => {
    console.log(`User ${userId}: ${completedTasksByUser[userId]} completed task(s)`);
  });
});
