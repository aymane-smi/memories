const express = require("express"),
      router  = express.Router(),
      {getPosts, postCreation} = require("../controllers/posts");


router.get("/", getPosts);
router.post("/", postCreation);

module.exports = router;