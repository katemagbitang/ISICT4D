const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    username: {
        type: String,
        ref: "User",
        required: [true, 'Required']
    },
    cartItemsID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Required']
    },
    items:[{
        productID: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Required']
        },
        quantity: {
            type: Number,
            required: [true,'Required']
        }
    }]
});

module.exports = mongoose.model('cartitems',cartItemSchema);