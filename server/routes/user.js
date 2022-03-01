const express = require("express"),
      router  = express.Router({mergeParams: true});
      user    = require("../controllers/user");

router.post("/signin", user.signin);
router.post("/signup", user.signup);

module.exports = router;