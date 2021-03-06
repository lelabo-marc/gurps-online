/**
 * Created by lelabo on 18/09/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Habit', new Schema({
    _owner          : { type: Schema.Types.ObjectId, ref: 'Character' },
    name            : String,
    description     : String,
    _type           : { type: Schema.Types.ObjectId, ref: 'HabitType' },
}));