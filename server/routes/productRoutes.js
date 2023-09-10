/* eslint-disable no-unused-vars */
const express = require("express");
const productRouter = express.Router();

const {
    getAllProducts,
    getAllProductsASC,
    getAllProductsDSC,
    getProductById,
    getProductByTitle,
    createProduct,
    updateProductById,
    deleteProductById
} = require("../controllers/productController");

const { authenticate } = require("../middleware/authenticate");
const {
    checkBuyer,
    checkSeller,
    checkAdmin
} = require("../middleware/checkRoles");

// Start uploading image middleware
const multer = require("multer");

const limits = {
    fileSize : 4000000
}

const imageFilter = (req, file, cb) => {
    //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        // handling err instanceof multer.MulterError in the controller
        return cb(new Error('File must be of type JPG, JPEG, or PNG and nore more than 2MB in size', false));
    } else if (!file.mimetype.startsWith("image")) {
        // handling err instanceof multer.MulterError in the controller
        return cb(new Error("Please upload only images.", false));
    }
    //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
    cb(undefined, true)
};

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'uploads')
    },
    filename: function (req, file, cb) {
        
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

let uploadImage = multer({ 
    storage: storage, 
    fileFilter: imageFilter,
    limits: limits,
});
// End uploading image middleware


productRouter.get('/', authenticate, getAllProducts);
productRouter.get('/productsASC', authenticate, getAllProductsASC);
productRouter.get('/productsDSC', authenticate, getAllProductsDSC);

productRouter.get('/:id', authenticate, getProductById);
productRouter.get('/title/:title', authenticate, getProductByTitle);

productRouter.post('/create', authenticate, checkSeller, uploadImage.single('image'), createProduct);
productRouter.put('/update/:id', authenticate, checkSeller, uploadImage.single('image'), updateProductById);
productRouter.delete('/delete/:id', authenticate, checkSeller, deleteProductById);

module.exports = productRouter;