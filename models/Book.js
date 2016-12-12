var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    num_person: {type: Number},
    check_in: {type: String},
    check_out: {type: String},
    introduce: {type: String},
    bookedAt: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, index: true},
    userName: {type: String}
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Book = mongoose.model('Book', schema);

module.exports = Book;
