'use strict';

var awss3 = require('./awss3');
var multer       = require('multer'); // v1.0.5
var MulterS3     = require('multer-s3');
var bodyParser   = require('body-parser');

class StorageSetupConfiguration {
	constructor(core) {
		this.core = core;
		this.awsS3 = new awss3(this.core.env);
		return this.init();
	}

	init() {
		this.core.app.use(multer({
		    storage: this.core.env.diskStorage == 's3' ? this.storageAwsS3() : this.storageAwsLocal()
		}).any());
		this.core.app.use(bodyParser.json());
		this.core.app.use(bodyParser.urlencoded({
		    extended: true
		}));
		this.core.app.use(bodyParser.text());

		return this.core;
	}


	storageAwsS3() {
		return MulterS3({
	        s3: s3,
	        bucket: this.core.env.AwsS3Bucket,
	        acl: 'public-read',
	        metadata: function(req, file, cb) {
	            cb(null, {
	                fieldName: file.fieldname
	            });
	        },
	        key: function(req, file, cb) {
	            var urlText = req.url;
	            var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
	            var filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
	            file.filename = filename;
	            if (rt !== null) {
	            	file.dir = rt[1] + '/' + filename;
	            } else {
	            	file.dir = filename;
	            }	
	            req.files = file;
	            cb(null, this.core.env.appEnv + '/' + file.dir);
	        }
    	});
	}

	storageAwsLocal() {
		return multer.diskStorage({
	        destination: function(req, file, callback) {
	            var urlText = req.url;
	            var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
	            var dir = './public/uploads/' + rt[1];
	            mkdirp(root + '/public/uploads/' + rt[1], function(err) {
	                if (err) {
	                    debug(err.trace);
	                }
	                else {
	                    callback(null, dir);
	                }
	            });
	        },
	        filename: function(req, file, callback) {
	            var urlText = req.url;
	            var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
	            var filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
	            file.filename = filename;
	            file.dir = rt[1] + '/' + filename;
	            req.files = file;
	            callback(null, filename);
	        }
	    });
	}
}



module.exports = StorageSetupConfiguration;