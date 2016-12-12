var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, index: true},
    host: {type: Schema.Types.ObjectId, index: true},
    book: {type: Schema.Types.ObjectId, index: true},
    hostTitle: {type: String},
    userName: {type: String},
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Request = mongoose.model('Request', schema);

module.exports = Request;
