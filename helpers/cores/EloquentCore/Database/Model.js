'use strict';
var path = require('path');
var root = path.resolve();

var Core 	  = require(root + '/helpers/cores/Angel/Core');
var modelDir  = path.resolve(root + '/app/schemas');
var dbConf    = require(root + '/config/database');

var caminte   = require('caminte');
var Schema    = caminte.Schema;


class Model {
	constructor(SubdomainName) {
		this.core = new Core();
		this.subdomainname = SubdomainName;
		this.database  = dbConf[this.core.env.db.driver];
		if (!this.core.SchemaDefault) {
			this.core.make('SchemaDefault', new Schema(this.database.driver, this.database));
		}
	}

	load(SchemaName) {
		const SchemaSubdomain = this.core.app.locals[this.subdomainname + '-schema'];
		if (this.subdomainname) {
			if (this.SchemaSubdomain) {
				let config = require(root + '/helpers/env')(this.subdomainname);
				let dbConfig = config.db;
	            dbConfig.username = dbConfig.user;
	            let newSchema = new Schema(dbConfig.driver, dbConfig);
	            this.core.app.locals[subdomain + '-schema'] = newSchema;

	            return require(modelDir + '/' + SchemaName + '.js')(this.subdomainname);
			} else {
				return require(modelDir + '/' + SchemaName + '.js')(SchemaSubdomain);
			}
		} else {
			return require(modelDir + '/' + SchemaName + '.js')(this.core.SchemaDefault);
		}
	}
}

module.exports = Model;