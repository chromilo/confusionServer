// Name: Chromilo Amin | chromiloamin@gmail.com
// Date: May 31, 2023
// Description: Assignment 2: MongoDB

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=> {
    Leaders.find({})
    .then((leaders) => {
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=> {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader Created ', leader);
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next)=> {
    Leaders.remove({})
    .then((resp) => {
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next)=> {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=> {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})
.put((req,res,next)=> {
    res.write('Updating the leader: ' + req.params.leaderId + ' ');
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description)
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=> {
    res.end('Deleting leader: ' + req.params.leaderId);
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;