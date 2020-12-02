const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema = new Schema({
    productID:{
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true, 'Required']
    },
    productName: {
        type : String,
        required: [true, 'Required']
    },
    productCategory: {
        type : String,
        required: [true, 'Required']
    },
    productOrigin: {
        type : String,
        required: [true, 'Required']
    },
    productDescription: {
        type : String,
        required: [true, 'Required']
    },
    quantity: {
        type : Number,
        required: [true, 'Required']
    },
    price: {
        type : Number,
        required: [true, 'Required']
    },
    seller: [{
        type : Schema.Types.ObjectId,
        ref: "Seller",
        required: [true, 'Required']
    }],
    photo: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);