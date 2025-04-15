import { Product } from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../middlewares/asyncHandler.js";
import { NextFunction, Response, Request } from "express";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { rm } from "fs";
import { create } from "domain";
import { deleteFromCloudinary, invalidateCache, uploadToCloudinary } from "../utils/features.js";
import { redis, redisTTL } from "../app.js";

// add new product - only admin
export const newProduct = TryCatch(async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction) => {
    
    const { name, category, price, stock, description } = req.body
    // const photo = req.file
    const photos = req.files as Express.Multer.File[] | undefined;

    // console.log("photo path",photo?.path);

    if (!photos) return next(new ErrorHandler("Photo is Reqiired", 404))
    
    if (photos.length < 1)
      return next(new ErrorHandler("Please add atleast one Photo", 400));

    if (photos.length > 5)
      return next(new ErrorHandler("You can only upload 5 Photos", 400));
    
    if (!name || !price || !stock || !category || !description) {
         return next(new ErrorHandler("Please enter All Fields", 400));
    }

    const photosURL = await uploadToCloudinary(photos);
    
    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photos: photosURL,
        description
    })

    // console.log("product", product);
     await invalidateCache({ product: true, admin: true });

    
    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
    });
    
})

// get latest product
export const getLatestProduct = TryCatch(async ( req, res, next) => {
    
    let products         
    products= await redis.get("latest-products")
    
    if (products) {
        products = JSON.parse(products);
    } else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5)
        if (!products) {
         return next(new ErrorHandler("No Latest Products Data", 404))
        }
         await redis.setex("latest-products", redisTTL, JSON.stringify(products));
    }
        
    
    
    return res.status(201).json({
        success: true,
        message: "Latest Product",
        products
    });
    
    
})


// get Categories
export const getAllCategories = TryCatch(async ( req, res, next) => {
    
    let categories 

    categories =  await redis.get("categories");
    

    if (categories) {
        categories = JSON.parse(categories);
    } else {
        categories = await Product.find({}).distinct("category")
        
        if (!categories) {
            return next(new ErrorHandler("No categories  Data", 404))
        }
        await redis.setex("categories", redisTTL, JSON.stringify(categories));
    }
       

    return res.status(201).json({
        success: true,
        message: "All Product",
        categories: categories
    });
    
})


// get all Amdin Products
export const getAdminProduct = TryCatch(async ( req, res, next) => {
    
    let product 
        
    product = await redis.get("all-products");

    if (product) {
            product = JSON.parse(product);
    } else {
        product = await Product.find()
        
        if (!product) {
             return next(new ErrorHandler("No Products Data", 404))
        }

        await redis.setex("all-products", redisTTL, JSON.stringify(product));
    }

    return res.status(201).json({
        success: true,
        message: "All Product Data" ,
        products: product
    });
    
    
})


// get single Product
export const getSingleProduct = TryCatch(async ( req, res, next) => {

    let product
    const { id } = req.params
    const key = `product-${id}`

    product = await redis.get(key);

    if (product) {
        product = JSON.parse(product);
    } else {
        product = await Product.findById(id)
        
        if (!id) {
            return next(new ErrorHandler("Product Not Found", 404))
        }

        await redis.setex(key, redisTTL, JSON.stringify(product));
    }
    
   
    
    return res.status(201).json({
        success: true,
        message: `Product Name :- ${product?.name}`,
        product: product
    });
    
    
})


// add new product - only admin
export const updateProduct = TryCatch(async (req, res, next) => {
    
    const { name, category, price, stock, description } = req.body
    const photos = req.files as Express.Multer.File[] | undefined;
    const { id } = req.params


    const product = await Product.findById(id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

     if (photos && photos.length > 0) {
    const photosURL = await uploadToCloudinary(photos);

    const ids = product.photos.map((photo) => photo.public_id);

    await deleteFromCloudinary(ids);

    // Add new photos properly
    photosURL.forEach(photo => {
        product.photos.push({
            public_id: photo.public_id,
            url: photo.url
        });
    });
  }
    
   
    if (name) product.name = name
    if (price) product.price = price
    if (stock) product.stock = stock
    if (category) product.category = category
    if(description) product.description = description
    

    await product.save()

    await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
    });
    
    return res.status(201).json({
        success: true,
        message: "Product Updated Successfully",
    });
    
})


// Delete Product
export const deleteProduct = TryCatch(async ( req, res, next) => {

    const { id } = req.params

    if (!id) {
        return next(new ErrorHandler("Please Provide ID", 404))
    }


    const product = await Product.findByIdAndDelete(id)

    if (!product) {
         return next(new ErrorHandler("Product Not Found", 404))
    }



    const ids = product.photos.map((photo) => photo.public_id);
    await deleteFromCloudinary(ids);

    await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
    });

    return res.status(201).json({
        success: true,
        message: `Delete Product Successfully :- ${product?.name}`,
    });
    
    
})



// get all product
export const getAllProducts = TryCatch(async (
    req: Request<{}, {}, {}, SearchRequestQuery>, res, next ) => {

    const { search, sort, price, category } = req.query
    const page = Number(req.query.page) || 1;

    const key = `products-${search}-${sort}-${category}-${price}-${page}`;

    let products;
    let totlaPage

    const cachedData = await redis.get(key);
    if (cachedData) {
        const data = JSON.parse(cachedData);
        totlaPage = data.totalPage;
        products = data.products;
    } else {
   
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    
    const baseQuery: BaseQuery = {}

    if (search) {
        baseQuery.name = {
            $regex: search,
            $options: "i"
        }
    }

    if (price) {
        baseQuery.price = {
            $lte : Number(price)
        }
    }

    if (category) {
        baseQuery.category = category
    }


    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip)
    
    const [productsFetched, filterOnlyProducts] = await Promise.all([
        productsPromise,
        Product.find(baseQuery)
    ])
        products = productsFetched
        totlaPage = Math.ceil(filterOnlyProducts.length / limit)
        
        if (!products || !filterOnlyProducts) {
         return next(new ErrorHandler("No Latest Products Data", 404))
        }
        
         await redis.setex(key, 30, JSON.stringify({ products, totlaPage }));
    }
    

    return res.status(201).json({
        success: true,
        message: "products",
        totalPages: totlaPage,
        products: products
    });
    
    
})
