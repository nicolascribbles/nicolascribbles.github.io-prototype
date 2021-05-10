const db = require("../models");
const Blog = db.blogs;

exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty!"});
    return
  }
  // Validate request
  if (!req.body.img_url) {
    res.status(400).send({ message: "You need an image!"});
    return
  }
  
  const blog = new Blog({
    title: res.body.title,
    img_url: res.body.img_url,
    published: res.body.published ? req.body.published : false,
    content: res.body.content,
    author_name: res.body.author_name,
    author_email: res.body.author_name
  });
  
  blog
    .save(blog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the blog."
      });
    });
};

// Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i"} } : {};
  
  Blog.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving blogs."
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.param.id;
  Blog.findById(id)
    .then(data => {
      if (!data)
        res.status(400).send({ message: "Cannot find blog with id " + id })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while fetching the blog."
        });
    })
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }
  
  const id = req.params.id;
  
  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(04).send({
          message: `Cannot update Blog with id=${id}. Maybe blog was not found.`
        });
      } else res.send({ message: 'Blog was successfully updated!'})
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating blog with id: " + id
      });
    });
  
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndRemove(id, { useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete blog with id=${id}. Maybe blog could not be located.`
        });
      } else {
        res.send({
          message: "Blog succesfully deleted."
        })
      }
    })
    .catch(err => {
      message: "Could not delete blog with id: " + id
    });
};

// Find all published Blogs
exports.findAllPublished = (req, res) => {
  Blog.find({ published: true})
    .then(data => {
      res.send(data);
    })
    .catch(err =>{
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving published blogs."
      });
    });
};