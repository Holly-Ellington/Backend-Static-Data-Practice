const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: DONE return a single user by id from /users/:userId in form of { data: Object }
app.use(
  '/users/:userId',
  (req, res, next) => {
    const { userId } = req.params;
    const foundUser = users.find((user) => user.id === Number(userId));
    if (foundUser) {
      res.json({ data: foundUser })
    } else {
      next(`User ID not found: ${userId}`);
    }
});
// TODO: return an array of users from /users in form of { data: Array }
app.use("/users", (req, res) => {
  res.json({ data: users });
})


// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.use("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params;
  const foundState = states[stateCode];
  if (foundState === undefined) {
    next(`State code not found: ${stateCode}`)
  } else {
    res.json({ data: {stateCode: stateCode, name: foundState} });
  }
});

// TODO: return all states from /states in the form of { data: Array }
app.use("/states", (req, res) => {
  res.json({ data: states });
});

// TODO: add not found handler updated
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`)
})

// TODO: Add error handler
app.use((error, req, res, next) => {
  console.log(error);
  res.send(error);
})

module.exports = app;

