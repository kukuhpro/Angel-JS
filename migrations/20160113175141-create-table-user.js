var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: 'string',
      created: 'date'
    },
    ifNotExists: true
  }, callback);
};

exports.down = function(db, callback) {
  callback();
};
