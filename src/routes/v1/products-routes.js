const express = require('express');

const productController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productController.createProduct);
router.post('/delete', productController.deleteProduct);
router.post('/get-products', productController.getProducts);

module.exports = router;
