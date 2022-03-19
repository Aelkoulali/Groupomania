const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const multer = require("../middleware/multer-config");

router.get("/post/:id", commentCtrl.getAllComments);
router.post("/", auth, multer.comments, commentCtrl.createComment);
router.put("/:id", auth, multer.comments, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
