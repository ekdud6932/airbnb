var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    password: {type: String},
    title: {type: String, require: true, trim: true},
    content: {type: String},
    city: {type: String},
    address: {type: String},
    charge: {type: Number},
    facility: {type: String},
    rule: {type: String},
    createdAt: {type: Date, default: Date.now},
    read: {type: Number, default: 0}
    // User_name: {type: String, required: true, trim: true}
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Host = mongoose.model('Host', schema);

module.exports = Host;
