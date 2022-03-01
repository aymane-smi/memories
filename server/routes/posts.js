const express                                                    = require("express"),
      router                                                     = express.Router(),
      {getPosts, postCreation, postUpdate, postDelete, postLike} = require("../controllers/posts"),
      auth                                                       = require("../middleware/auth");


router.get("/", auth, getPosts);
router.post("/", auth, postCreation);
router.patch("/:id", auth, postUpdate);
router.delete("/:id", auth, postDelete);
router.patch("/:id/likeCount", auth, postLike);

module.exports = router;