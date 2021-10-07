const express = require("express");
const authenticateController = require("../controller/authenticateController");
const router = express.Router();

router.post("/", authenticateController.authenticate);

module.exports = router;
