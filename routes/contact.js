const express = require("express");
const router = express.Router();
const userController = require("../controller/contact");
const multer = require("multer");
const upload = multer();


router.post("/",upload.none(),userController.createContact)
      .get("/",userController.getContacts);

exports.router = router;