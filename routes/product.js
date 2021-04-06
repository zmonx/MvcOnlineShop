const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const productsController = require('../controllers/product');

router.get('/', productsController.getSearchProduct_homepage);

// router.get('/shop', productsController.shopPage);

router.get('/insert', productsController.insert);

router.get('/shop', productsController.getSearchProduct);
router.get('/computer', productsController.getSearchProductByComputer);
router.get('/smartphone', productsController.getSearchProductByPhone);
router.get('/laptop', productsController.getSearchProductByLaptop);

router.get('/:product_id', productsController.detailProduct);


// router.get('/insert', productsController.getAddProduct);

// router.get('/update/:product_id', productsController.getUpdateProduct);

// /admin/add-product => POST
router.post('/insert', [
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], productsController.postAddProduct);

// router.post('/update', [
//     check('product_id').not().isEmpty().withMessage("empty"),
//     check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
//     check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
// ], productsController.postUpdateProduct);

// router.get('/delete/:product_id', productsController.getDeleteProduct);

exports.routes = router;