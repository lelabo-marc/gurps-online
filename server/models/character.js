/**
 * Created by lelabo on 25/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Character', new Schema({
    _owner : { type: Schema.Types.ObjectId, ref: 'User' , default: null},
    name   : String,
    exp    : Number,
}));