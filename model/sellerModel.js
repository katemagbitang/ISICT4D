const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const sellerSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    seller: {
        type: String,
        required: [true,'Required']
    }
});

module.exports = mongoose.model('Seller',sellerSchema);