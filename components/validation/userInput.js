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
        image1: { type: "string", nullable: true },
        image2: { type: "string", nullable: true },
        image3: { type: "string", nullable: true }
    },
    required: ["name", "price", "stock", "genre", "author", "year", "image1", "image2", "image3"],
    additionalProperties: false
}

// const validate = ajv.validate(productSchema);
// exports.product=validate
// const data = {
//     name
//         :
//         "",
//     price
//         :
//         0,
//     image2
//         :
//         "/products/nam-sinh-lop-12-lam-lai-bo-sach-giao-khoa-6-mon-gay-bao-mang...",
//     image3
//         :
//         "",
//     stock
//         :
//         100
// }

// // JSON.parse(JSON.stringify(req.body))
// // console.log(data);
// const valid = validate(data)
// if (valid) console.log("okok")


exports.product=(obj)=>{
    const validate=ajv.validate(productSchema,obj);
    return {valid: validate,errors: validate.errors};
}
