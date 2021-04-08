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
router.get('/product', productsController.getSearchProduct_edit);
// router.get('/product/:product_id', productsController.getSearchProduct_edit);
// router.get('/update', productsController.update);


router.get('/productDetail/:product_id', productsController.detailProduct);
router.post('/productDetail/:product_id', productsController.postAddtoCart);
router.post('/laptop', productsController.postAddtoCart);
router.post('/smartphone', productsController.postAddtoCart);
router.post('/computer', productsController.postAddtoCart);


router.get('/cart', productsController.cartPage);

router.get('/update/:product_id', productsController.getUpdateProduct);

// /admin/add-product => POST
router.post('/insert', [
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], productsController.postAddProduct);

router.post('/update', [
    check('product_id').not().isEmpty().withMessage("empty"),
    check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], productsController.postUpdateProduct);

router.get('/delete/:product_id', productsController.getDeleteProduct);
router.get('/del/:cart_id', productsController.getDeleteCart);

router.post('/shop', productsController.postAddtoCart);



exports.routes = router;