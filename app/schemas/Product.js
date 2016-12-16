module.exports = function(schema) {
    var Product = schema.define('products', {
        id: {type: schema. Integer},
        product_code: {type: schema.String},
        name: {type: schema.String},
        description: {type: schema.Text},
        category: {type: schema.JSON},
        brand: {type: schema.JSON},
        category_id: {type: schema.Integer},
        brand_id: {type: schema.Integer},
        created: {type: schema, JSON},
        created_by: {type: schema.Integer},
        created_at: { type: schema.Date },
        updated_at: { type: schema.Date },
        deleted_at: { type: schema.Date }
    });

    return Product;
};
