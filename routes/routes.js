const express = require('express');
const path = require('path');
const multer = require('multer');


//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/img',
    filename: function( req, file, callback){
        callback(null, filename =  file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
    }
});

//init upload 
const upload = multer({
    storage: storage
})

// check file type
function checkFileType(file , callback){
    // allowed extensions
    const filetypes = /jpeg|jpg|png/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return callback(null, true);
    }else{
        callback("Error: Images only");
    }
}
const app = express();

const controller = require('../controller/controller.js');
const userController = require('../controller/userController.js');
const postController = require('../controller/postController.js');
const adminController = require('../controller/adminController.js');
const productController = require('../controller/productController.js');
const cartController = require('../controller/cartController.js');

app.get('/', controller.getIndex);
app.get('/home', controller.getHome);
app.get('/getsession',controller.getSession);

app.get('/signup', userController.getSignup);
app.get('/login', userController.getLogin);
app.get('/logout', userController.getLogout);
app.get('/getUsername', userController.getUsername);
app.get('/getEmail', userController.getEmail);



app.get('/createpost', postController.getCreatePost);
app.get('/articles', postController.viewAllPost);
app.get('/post/:id', postController.viewPost);

app.post('/createpost', postController.postCreatePost);

app.post('/signup', userController.postSignup);
app.post('/login', userController.postLogin);

app.post('/comment/:id',postController.postComment);

app.get('/editpost/:id',postController.getEditPost);

app.post('/editpost/:id',postController.postEditPost);

app.get('/deletepost/:id',postController.getDeletePost);

app.get('/deletecomment/:id/:text', postController.getDeleteComment);
/*Pages*/
app.get('/aboutus',controller.getAbout);

/*Shop Functions*/
app.get('/shop', productController.getShop);
app.get('/shop/:productID', productController.getOneProduct);
app.get('/cart',cartController.getCart);
app.post('/addToCart/:bookVersion_ID', cartController.postAddToCart);
app.post('/removeItem/:productID', cartController.postRemoveBook);
app.get('/getCartItemsCount', cartController.getCartItemsCount);

/*Admin Functions*/
app.get('/addproduct', adminController.getAddProduct);
app.post('/addproduct', upload.single('myImage'), adminController.postAddProduct);

module.exports = app;