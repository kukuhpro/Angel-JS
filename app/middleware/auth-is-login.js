/*jslint node: true */
"use strict";

module.exports = function(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    } else {
        // if they aren't redirect them to the home page
        return res.redirect('/');
    }
}
