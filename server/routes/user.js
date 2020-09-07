const express = require("express");

const router = express.Router();

module.exports = router;

// Get user informations
router.get("/", (req, res) => {
  const user = (req.user && req.user.hidePassword()) || null;
  res.send({ message: "User info successfully retreived", user });
});
