const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const usersFilePath = path.join(__dirname, "../data/users.json");
const usersPropertiesFilePath = path.join(
  __dirname,
  "../data/users-property-cards.json"
);

exports.login = (username, password) => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        console.log(`authService.js - line: 13 ->> users`, users);
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          console.log(`authService.js - line: 16 ->> IF user found `, user);
          resolve(user);
        } else {
          console.log(`authService.js - line: 19 ->> ELSE not found`);
          reject("Invalid username or password");
        }
      }
    });
  });
};

exports.signin = (username, password) => {
  return new Promise((resolve, reject) => {
    const errors = 0;
    let newUUID = "";
    let newUser = {};

    fs.readFile(usersFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        const existingUser = users.find((u) => u.username === username);
        if (existingUser) {
          reject("Username already exists");
        } else {
          newUUID = uuid.v4();
          newUser = { username, password, id: newUUID };
          users.push(newUser);

          fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
              reject(err);
            } else {
              // resolve(newUser);
            }
          });

          fs.readFile(usersPropertiesFilePath, "utf8", (err, data) => {
            if (err) {
              reject(err);
            } else {
              const usersProperties = JSON.parse(data);
              const existingUser = usersProperties.find(
                (u) => u.username === username
              );
              if (existingUser) {
                reject("Username already exists");
              } else {
                const propertyTemplate = {
                  id: newUUID,
                  propertyCard: {
                    title: "My Pretty House",
                    address: "",
                    city: "",
                    postalCode: "",
                    country: "",
                    bedrooms: "",
                    bathrooms: "",
                    totalArea: "",
                    plotSize: "",
                    photo: null,
                  },
                };

                usersProperties.push(propertyTemplate);

                fs.writeFile(
                  usersPropertiesFilePath,
                  JSON.stringify(usersProperties, null, 2),
                  (err) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(newUser);
                      // resolve(newUser);
                    }
                  }
                );
              }
            }
          });
        }
      }
    });
  });
};

exports.propertyCard = (userId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersPropertiesFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = JSON.parse(data);
        const userPropertyCard = users.find((u) => u.id === userId);
        if (!userPropertyCard) {
          reject("User property not found");
        } else {
          resolve(userPropertyCard);
        }
      }
    });
  });
};

exports.propertyCardEdit = (userId, formData) => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersPropertiesFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const usersProperties = JSON.parse(data);

        console.log(
          `authService.js - line: 83 ->> usersProperties`,
          data,
          usersProperties
        );

        const userPropertyCard = usersProperties.find((u) => u.id === userId);

        console.log(
          `authService.js - line: 88 ->> userPropertyCard`,
          userPropertyCard
        );
        if (!userPropertyCard) {
          reject("User property not found");
        } else {
          userPropertyCard.propertyCard = formData;

          fs.writeFile(
            usersPropertiesFilePath,
            JSON.stringify(usersProperties, null, 2),
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        }
      }
    });
  });
};
