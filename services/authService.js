const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');

exports.login = (username, password) => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
          resolve(user);
        } else {
          reject('Invalid username or password');
        }
      }
    });
  });
};

exports.signin = (username, password) => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        const existingUser = users.find((u) => u.username === username);
        if (existingUser) {
          reject('Username already exists');
        } else {
          const newUser = { username, password };
          users.push(newUser);
          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newUser);
            }
          });
        }
      }
    });
  });
};
