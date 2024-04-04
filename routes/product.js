const express = require("express");
const multer = require("multer");
const productController = require("../controller/product.js");
const router = express.Router();


// Multer Storage
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,"uploads/");
    },
    filename:function (req,file,cb) {
        cb(null, Date.now()+ "-" + file.originalname);
    }
})

// middleware
const upload = multer({storage:storage});



const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'photos', maxCount: 8 }])


router.post("/",cpUpload,productController.createProduct)
.get("/adhesives",productController.getAdhesiveProducts)
.get("/groute",productController.getGroutProducts)
.get("/tile",productController.getCleanerProducts)
.get("/joint",productController.getJointProducts)
.get("/accessories",productController.getTileProducts)
.get("/:id",productController.getproduct)
.get("/",productController.getproducts)
.put("/:id",productController.replaceproduct)
.patch("/:id",upload.single("image"),productController.updateproduct)
.delete("/:id",productController.deleteproduct);

exports.router = router;