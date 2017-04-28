/**
 * Created by lelabo on 28/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Campaign = require('../models/campaign');
var ObjectId = mongoose.Types.ObjectId;

router.post('/', function (req, res) {
    new Campaign({
        _owner: ObjectId(req.user._id),
        name: req.body.name,
    }).save(function(err, campaign) {
        if (err) throw err;
        req.user.campaigns.push(ObjectId(campaign._id));
        req.user.save();
        res.json({ success: true });
    });
});

router.get('/', function(req, res) {
    Campaign.find({_owner: ObjectId(req.user._id)}).populate('_owner').exec(function(err, campaigns) {
        if (err) throw err;
        res.json(campaigns);
    });
});

router.get('/:id', function(req, res) {
    Campaign.findOne({id: ObjectId(req.params.id)}).populate('_owner').exec(function(err, campaigns) {
        if (err) throw err;
        res.json(campaigns);
    });
});

router.delete('/:id', function(req, res) {
    Campaign.findOne({id : ObjectId(req.params.id)}).exec(function (err, obj){
        if (err) throw err;
        obj.remove(function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

module.exports = router;