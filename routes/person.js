const express = require("express");
const personController = require("../controller/personController");
const authenticateJWT = require("../helper/api/authenticateJWT");
const router = express.Router();

router.get("/", authenticateJWT, personController.getPersons);
router.post("/", authenticateJWT, personController.createPerson);
router.put("/", authenticateJWT, personController.updatePerson);
router.delete("/", authenticateJWT, personController.deletePerson);
router.get(
  "/filter-male-pending",
  authenticateJWT,
  personController.findFilterPerson
);

router.get("/:id", authenticateJWT, personController.findPerson);

module.exports = router;
