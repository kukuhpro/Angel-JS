module.exports = function(schema) {
    var User = schema.define('users', {
        username: { type: schema.String },
        password: { type: schema.String },
        passcode: { type: schema.String },
        firstname: { type: schema.String },
        lastname: { type: schema.String },
        email: { type: schema.String },
        mobile: { type: schema.String },
        created_at: { type: schema.Date },
        updated_at: { type: schema.Date },
        deleted_at: { type: schema.Date }
    });

    return User;
};
