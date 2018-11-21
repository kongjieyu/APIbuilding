const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer  = require('multer');
const checkAuth = require('../middleware/check-auth')
const ProductsController = require ('../controllers/products');

//exacute multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file 
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else{
        cb(null, false);
    }    
};

const upload = multer({ storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

// const Product = require('../models/product');

//get method
router.get('/', ProductsController.products_get_all);

//post method
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

//getbyID method
router.get('/:productId', ProductsController.products_get_product);

//updating method
router.patch('/:productId', checkAuth, ProductsController.products_update_product);

//delete method
router.delete('/:productId', checkAuth, ProductsController.products_delete);

module.exports = router;