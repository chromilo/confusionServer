// Name: Chromilo Amin | chromiloamin@gmail.com
// Date: May 31, 2023
// Description: Assignment 2: MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

 //{
 //     "name": "Weekend Grand Buffet",
 //     "image": "images/buffet.png",
 //     "label": "New",
 //     "price": "19.99",
 //     "description": "Featuring . . .",
 //     "featured": false
//}
const promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion',promoSchema);

module.exports = Promotions;
