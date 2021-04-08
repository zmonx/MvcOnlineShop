const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const cartController = require('../controllers/cart');


// router.get('/cart', cartController.cartPage);


exports.routes = router;