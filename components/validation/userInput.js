const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const productSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        price: { type: "integer" },
        stock: { type: "integer" },
        genre: { type: "string" },
        author: { type: "string" },
        year: { type: "integer" },
        image1: { type: "string", nullable: true },
        image2: { type: "string", nullable: true },
        image3: { type: "string", nullable: true }
    },
    required: ["name", "price", "stock", "genre", "author", "year", "image1", "image2", "image3"],
    additionalProperties: false
}

const validate = ajv.compile(productSchema);
exports.product=validate
// const data = {
//     name
//         :
//         "Vật lý",
//     genre
//         :
//         "Sách giáo khoa",
//     price
//         :
//         30,
//     author
//         :
//         "Nhà xuất bản giáo dục",
//     year
//         :
//         2021,
//     image1
//         :
//         "/products/vatly.jpg",
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