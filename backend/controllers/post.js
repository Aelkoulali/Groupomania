const models = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/* Create Post */

exports.createPost = (req, res, next) => {
  const postObject = {
    User_id: req.auth.userId,
    content: req.body.content,
  };

  if (req.file) {
    postObject.image = req.file.filename;
  }
  if (req.body.content == undefined && req.file == undefined) {
    return res.status(400).json({
      message: "Votre publication est vide !"
    });
  }
  console.log(postObject);
  models.Post.create(postObject)

    .then(() => res.status(201).json({
      message: "Post publié !"
    }))
    .catch((error) => res.status(400).json({
      error
    }));
};

/* Modify Post */

exports.modifyPost = (req, res, next) => {
  models.Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((post) => {
      if (post.User_id !== req.auth.userId) {
        res.status(403).json({
          message: "vous n'êtes pas autorisé à modifier cette publication",
        });
      } else {
        const postObject = {
          id: post.id,
          User_id: post.User_id,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          image: post.image,
          content: req.body.content,
        };

        if (req.file) {
          if (post.image) {
            console.log(post.image);
            fs.unlink(`images/posts/${post.image}`, () => {});
          }
          postObject.image = req.file.filename;
        }

        post
          .update(postObject)
          .then(() =>
            res
            .status(200)
            .json({
              post: postObject,
              message: "Post modifié !"
            })
          )
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(500).json({
      error
    }));
};

/* Display All Posts */

exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({
      order: [
        ["createdAt", "DESC"]
      ],
      attributes: ["id", "User_id", "content", "image", "createdAt", "updatedAt"],
      include: [{
          model: models.User,
          attributes: ["lastName", "firstName", "avatar"],
        },
        {
          model: models.Comment,
          attributes: ["id", "User_id", "content", "image", "createdAt", "UpdatedAt"],
          include: [{
            model: models.User,
            attributes: ["lastName", "firstName", "avatar"],
          }, ],
        },
      ],
    })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      res.status(500).json(error);
    });
};

/* Display One Post */

exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "User_id", "content", "image", "createdAt", "updatedAt"],
      include: [{
          model: models.User,
          attributes: ["lastName", "firstName", "avatar"],
        },
        {
          model: models.Comment,
          attributes: ["id", "User_id", "content", "image", "createdAt", "updatedAt"],
          include: [{
            model: models.User,
            attributes: ["lastName", "firstName", "avatar"],
          }, ],
        },
      ],
    })

    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};

/* Delete One Post */

exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const isAdmin = decodedToken.isAdmin;
  models.Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((post) => {
      if (!isAdmin && post.User_id !== req.auth.userId) {
        console.log(isAdmin);
        res.status(403).json({
          error: "Unauthorized request"
        });
      } else {
        fs.unlink(`images/posts/${post.image}`, () => {
          post
            .destroy()
            .then(() => res.status(200).json({
              message: "Post supprimé !"
            }))
            .catch((error) => res.status(400).json({
              error
            }));
        });
      }
    })
    .catch((error) => res.status(500).json({
      error
    }));
};