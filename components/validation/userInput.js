const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}

const productSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1 , maxLength: 100 },
        price: { type: "integer", minimum: 1 },
        stock: { type: "integer", minimum: 1 },
        genre: { type: "string", minLength: 1, maxLength: 100 },
        author: { type: "string", minLength: 1, maxLength: 100 },
        year: { type: "integer", minimum: 1 },
        // image1: { type: "string", nullable: true },
        // image2: { type: "string", nullable: true },
        // image3: { type: "string", nullable: true }
    },
    required: ["name", "price", "stock", "genre", "author", "year"],
    additionalProperties: false
}

const accountSchema={
    type: "object",
    properties:{
        email:{
            type: 'string',
            format: 'email',
            minLength: 1,
            maxLength: 100
        },
        password: {
            type: 'string',
            minLength: 6,
        },
        required: ['email', 'password'],
        additionalProperties: false
    }
}

exports.product=(obj)=>{
    const validate=ajv.validate(productSchema,obj);
    return {valid: validate,errors: validate.errors};
}
exports.acount=(obj)=>{
    const validate=ajv.validate(accountSchema,obj);
    return {valid: validate,errors: validate.errors};
}
