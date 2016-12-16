module.exports = function(schema) {
    var Brand = schema.define('brands', {
    	id: {type: schema.Integer},
        name: {type: schema.String},
        slug: {type: schema.Integer},
        created_at: { type: schema.Date },
        updated_at: { type: schema.Date },
        deleted_at: { type: schema.Date }
    });
    return Brand;
};
