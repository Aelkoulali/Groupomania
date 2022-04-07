const models = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/* Create One Comment */

exports.createComment = (req, res, next) => {
  const commentObject = {
    User_id: req.auth.userId,
    content: req.body.content,
    Post_id: req.body.Post_id,
  };

  if (req.file) {
    commentObject.image = req.file.filename;
  }
  if (req.body.content == undefined && req.file == undefined) {
    return res.status(400).json({
      message: "Votre commentaire est vide !"
    });
  }
  console.log(commentObject);
  models.Comment.create(commentObject)

    .then(() => res.status(201).json({
      message: "Commentaire publié !"
    }))
    .catch((error) => res.status(400).json({
      error
    }));
};

/* Modify One Comment */

exports.modifyComment = (req, res, next) => {
  models.Comment.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((comment) => {
      if (comment.User_id !== req.auth.userId) {
        res.status(403).json({
          message: "vous n'êtes pas autorisé à modifier ce commentaire",
        });
      } else {
        const commentObject = {
          id: comment.id,
          User_id: comment.User_id,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          image: comment.image,
          content: req.body.content,
        };

        if (req.file) {
          if (comment.image) {
            console.log(comment.image);
            fs.unlink(`images/comments/${comment.image}`, () => {});
          }
          commentObject.image = req.file.filename;
        }

        comment
          .update(commentObject)
          .then(() =>
            res.status(200).json({
              comment: commentObject,
              message: "Commentaire modifié !",
            })
          )
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(500).json({
      error
    }));
};

/* Delete One Comment */

exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const isAdmin = decodedToken.isAdmin;
  models.Comment.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((comment) => {
      if (!isAdmin && comment.User_id !== req.auth.userId) {
        console.log(isAdmin);
        res.status(403).json({
          error: "Unauthorized request"
        });
      } else {
        fs.unlink(`images/comments/${comment.image}`, () => {
          comment
            .destroy()
            .then(() =>
              res.status(200).json({
                message: "Commentaire supprimé !"
              })
            )
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

/* Display All Comments */

exports.getAllComments = (req, res, next) => {
  models.Comment.findAll({
      where: {
        Post_id: req.params.id
      },
      order: [
        ["createdAt", "ASC"]
      ],
      attributes: ["id", "User_id", "Post_id", "content", "image", "createdAt", "updatedAt"],
      include: [{
        model: models.User,
        attributes: ["id", "lastName", "firstName", "avatar"],
      }, ],
    })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => {
      res.status(500).json(error);
    });
};