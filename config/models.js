/**
*  models loader
*
*  Created by create caminte-cli script
*  App based on CaminteJS
*  CaminteJS homepage http://www.camintejs.com
**/

var env       = require('../helpers/env')();
var caminte   = require('caminte');
var Schema    = caminte.Schema;
var fs        = require('fs');
var path      = require('path');
var modelDir  = path.resolve(__dirname, './../models');
var modelList = fs.readdirSync(modelDir);
var dbConf    = require('./database');
var database  = dbConf[env.db.driver];
var schema    = new Schema(database.driver, database);

module.exports.init = function (app) {
      "use strict";
      process.env.AUTOUPDATE = true;

      if(!app.models) {
         app.models = {};
      }

      for(var m = 0; m < modelList.length; m++) {
          var modelFile = modelList[m];
          if (/\.js$/i.test(modelFile)) {
             var modelName = modelFile.replace(/\.js$/i, '');
             app.models[modelName] = require(modelDir + '/' + modelName)(schema);
          }
      }
      
      if ('function' === typeof schema.autoupdate) {
          if (process.env.AUTOUPDATE) {
              schema.autoupdate(function (err) {
                  if (err) {
                      console.log(err);
                  }
              });
          }
     }
     return app;
}

module.exports.call = function(modelName, subdomain) {
  "use strict";

  if (subdomain != undefined) {
    var config        = require('../helpers/env')(subdomain);
    var dbConfig      = config.db;
    dbConfig.username = dbConfig.user;
    var newSchema     = new Schema(dbConfig.driver, dbConfig);

    return require(modelDir + '/' + modelName + '.js')(newSchema);
  } else {
    return require(modelDir + '/' + modelName + '.js')(schema);
  }
};