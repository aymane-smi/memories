const express = require("express"),
      router  = express.Router(),
      {getPosts, postCreation, postUpdate, postDelete, postLike} = require("../controllers/posts");


router.get("/", getPosts);
router.post("/", postCreation);
router.patch("/:id", postUpdate);
router.delete("/:id", postDelete);
router.patch("/:id/likeCount", postLike);

module.exports = router;