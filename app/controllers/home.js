var express = require('express');
var home = express.Router();
var root = require('path').resolve();
var caminte = require(root + '/helpers/caminte');

var User = caminte.model('User');
var Post = caminte.model('Post');

exports.index = function(req, res) {
    "use strict";
    Post.belongsTo(User, {
        as: 'user',
        foreignKey: 'user_id'
    });
    return res.render('index', {
        title: 'Etalastic'
    });
};
