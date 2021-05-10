const db = require("../models/index");
const User = db.users;

exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Username cannot be empty!"});
    return
  }
  // Validate request
  if (!req.body.password) {
    res.status(400).send({ message: "Password cannot be empty!"});
    return
  }
  
  const user = new User({
    username: res.body.username,
    first_name: res.body.first_name,
    last_name: res.body.last_name,
    user_email: res.body.user_email,
    password: res.body.password
  });
  
  user
    .save(user)
    .then((res, data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i"} } : {};
  
  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving the user."
      });
    });
};

exports.authenticateUser = (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  User.findOne({ username: username })
    .then(data =>(
      if (!data) {
        return res.status(400).send({
          message: "Data to update cannot be empty!"
        });
      } else {
        
        data.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          console.log(password, isMatch);
        });
      }
    ))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while fetching the User."
        });
  })
}

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(data => {
      if (!data)
        res.status(400).send({ message: "Cannot find user with id " + id })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while fetching the user."
        });
    })
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }
  
  const id = req.params.id;
  
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(04).send({
          message: `Cannot update User with id=${id}. Maybe User was not found.`
        });
      } else res.send({ message: 'User was successfully updated!'})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id: " + id
      });
    });
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, { useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User could not be located.`
        });
      } else {
        res.send({
          message: "User succesfully deleted."
        })
      }
    })
    .catch(err => {
      message: "Could not delete User with id: " + id
    });
};