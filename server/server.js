/**
 * Created by lelabo on 11/04/17.
 */
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors        = require('cors');


var config = require('./config'); // get our config file
var port = process.env.PORT || 4000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan('dev')); // LOG
app.use(cors());
app.use('/api/users', require('./routes/auth'));
app.use('/api/dices', require('./routes/rolls'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/postures', require('./routes/postures'));
app.use('/api/advantages', require('./routes/advantages'));
app.use('/api/appearances', require('./routes/appearances'));
app.use('/api/disadvantages', require('./routes/disadvantages'));
app.use('/api/damages', require('./routes/damages'));
app.use('/api/habits', require('./routes/habits'));
app.use('/api/wealths', require('./routes/wealths'));
app.use('/api', require('./routes/middleware'));
app.use('/api/users', require('./routes/users'));
app.use('/api/characters', require('./routes/characters'));
app.use('/api/campaigns', require('./routes/campaigns'));

app.listen(port);
console.log("Server ready!");
