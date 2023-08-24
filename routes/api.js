const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const purchaseHistoryController = require("../controllers/purchaseHistoryController");
const upload = require("../utils/multer");

router.get("/products", productController.getProducts);
router.get("/purchase-history", purchaseHistoryController.getPurchaseHistory);
router.post("/products", upload.single("image"), productController.addProduct);
router.put("/products/:id/status", productController.updateProductStatus);
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post(
  "/history/purchase",
  purchaseHistoryController.createPurchaseHistory
);



module.exports = router;
