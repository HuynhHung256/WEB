const async = require('hbs/lib/async');
const service = require('../product/productService');

const PRODUCT_IN_PAGE=4;

exports.showDetail = async (req, res, next) => {
    const id = req.params['id'];
    const product = await service.productById(id);
    res.render('shop/product-detail', {id:id, product:product, layout:'layout'});
}

exports.showList = async (req, res, next) => {
    if(req.user && req.user.role=='admin'){
        res.redirect('/admin');
        return;
    }
    // const page = {
    //     number: req.params['page'] || 1,
    //     limit: PRODUCT_IN_PAGE
    // };
    // const query = {
    //     name: {$regex:req.query.search||''}
    // }

    // const products = await service.list(query, page);
    // const nProduct = await service.numOfProduct(query);

    const search=req.query.search;
    const sort=req.query.sort;
    const genre=req.query.genre;
    const from=req.query.from;
    const to=req.query.to;
    // const from=price.
    // const page=req.query.page;
    console.log(genre);

    res.render('shop/index', { search:search,sort:sort,genre:genre,from:from,to:to, layout:'layout'});
}

exports.getList = async (req, res, next) => {
    // console.log('page:', req.query.page);
    // const search=req.query.search;
    const sort_mode=req.query.sort;
    const genre_mode=req.query.genre;
    const from=req.query.from;
    const to=req.query.to;


    console.log(genre_mode);

    const page = {
        number: req.query.page || 1,
        limit: PRODUCT_IN_PAGE
    };
    const query = {
        name: {$regex: req.query.search ? req.query.search : '', $options: 'i'},
        price: {$gte: parseInt(from), $lte: parseInt(to)},
        genre: {$regex: req.query.genre ? req.query.genre : '', $options: 'i'}

    }
    const sort={};
    if(sort_mode=='year'){
        sort.year=1;
    }
    if(sort_mode=='name'){
        sort.name=1;
    }
    if(sort_mode=='price'){
        sort.price=1;
    }


    // console.log(query, sort);
    const products = await service.list(query,sort,page);
    const nProduct = await service.numOfProduct(query);
    // console.log(page);
    // res.render('shop/index', { products: products, nProduct:nProduct, page: page , nPage: Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE), layout:'layout'});
    res.json({ products: products, nProduct:nProduct, page: page.number , nPage: Math.ceil(nProduct/page.limit)});
}

// exports.getNumOfPage = async (req, res, next) => {
//     const products = await service.list(page,NUM_PRODUCT_IN_PAGE);
//     const nProduct = await service.numOfProduct();
//     res.json(Math.ceil(nProduct/NUM_PRODUCT_IN_PAGE));
// }


exports.cart = (req, res, next) => {
    res.render('shop/cart', {layout:'layout'});
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout',{layout:'layout'});
}
