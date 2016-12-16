module.exports = function(schema) {
    var Category = schema.define('categories', {
    	id: {type: schema.Integer},
        name: {type: schema.String},
        slug: {type: schema.Integer},
        product: {type: schema.JSON},
        created_at: { type: schema.Date },
        updated_at: { type: schema.Date },
        deleted_at: { type: schema.Date }
    });
    return Category;
};
