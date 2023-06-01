// Name: Chromilo Amin | chromiloamin@gmail.com
// Date: May 31, 2023
// Description: Assignment 2: MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

//{
//      "name": "Peter Pan",
//      "image": "images/alberto.png",
//      "designation": "Chief Epicurious Officer",
//      "abbr": "CEO",
//      "description": "Our CEO, Peter, . . .",
//      "featured": false
//}
const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        default: ''
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

var Leaders = mongoose.model('Leader',leaderSchema);

module.exports = Leaders;
