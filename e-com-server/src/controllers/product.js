"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAdminProduct = exports.getAllCategories = exports.getLatestProduct = exports.newProduct = void 0;
var product_js_1 = require("../models/product.js");
var errorHandler_js_1 = require("../utils/errorHandler.js");
var asyncHandler_js_1 = require("../middlewares/asyncHandler.js");
var features_js_1 = require("../utils/features.js");
var app_js_1 = require("../app.js");
// add new product - only admin
exports.newProduct = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, category, price, stock, description, photos, photosURL;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, category = _a.category, price = _a.price, stock = _a.stock, description = _a.description;
                photos = req.files;
                // console.log("photo path",photo?.path);
                if (!photos)
                    return [2 /*return*/, next(new errorHandler_js_1.default("Photo is Reqiired", 404))];
                if (photos.length < 1)
                    return [2 /*return*/, next(new errorHandler_js_1.default("Please add atleast one Photo", 400))];
                if (photos.length > 5)
                    return [2 /*return*/, next(new errorHandler_js_1.default("You can only upload 5 Photos", 400))];
                if (!name || !price || !stock || !category || !description) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("Please enter All Fields", 400))];
                }
                return [4 /*yield*/, (0, features_js_1.uploadToCloudinary)(photos)];
            case 1:
                photosURL = _b.sent();
                return [4 /*yield*/, product_js_1.Product.create({
                        name: name,
                        price: price,
                        stock: stock,
                        category: category.toLowerCase(),
                        photos: photosURL,
                        description: description
                    })
                    // console.log("product", product);
                ];
            case 2:
                _b.sent();
                // console.log("product", product);
                return [4 /*yield*/, (0, features_js_1.invalidateCache)({ product: true, admin: true })];
            case 3:
                // console.log("product", product);
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Product Created Successfully",
                    })];
        }
    });
}); });
// get latest product
exports.getLatestProduct = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_js_1.redis.get("latest-products")];
            case 1:
                products = _a.sent();
                if (!products) return [3 /*break*/, 2];
                products = JSON.parse(products);
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, product_js_1.Product.find({}).sort({ createdAt: -1 }).limit(5)];
            case 3:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("No Latest Products Data", 404))];
                }
                return [4 /*yield*/, app_js_1.redis.setex("latest-products", app_js_1.redisTTL, JSON.stringify(products))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({
                    success: true,
                    message: "Latest Product",
                    products: products
                })];
        }
    });
}); });
// get Categories
exports.getAllCategories = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_js_1.redis.get("categories")];
            case 1:
                categories = _a.sent();
                if (!categories) return [3 /*break*/, 2];
                categories = JSON.parse(categories);
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, product_js_1.Product.find({}).distinct("category")];
            case 3:
                categories = _a.sent();
                if (!categories) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("No categories  Data", 404))];
                }
                return [4 /*yield*/, app_js_1.redis.setex("categories", app_js_1.redisTTL, JSON.stringify(categories))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({
                    success: true,
                    message: "All Product",
                    categories: categories
                })];
        }
    });
}); });
// get all Amdin Products
exports.getAdminProduct = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_js_1.redis.get("all-products")];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 2];
                product = JSON.parse(product);
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, product_js_1.Product.find()];
            case 3:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("No Products Data", 404))];
                }
                return [4 /*yield*/, app_js_1.redis.setex("all-products", app_js_1.redisTTL, JSON.stringify(product))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({
                    success: true,
                    message: "All Product Data",
                    products: product
                })];
        }
    });
}); });
// get single Product
exports.getSingleProduct = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product, id, key;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                key = "product-".concat(id);
                return [4 /*yield*/, app_js_1.redis.get(key)];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 2];
                product = JSON.parse(product);
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, product_js_1.Product.findById(id)];
            case 3:
                product = _a.sent();
                if (!id) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("Product Not Found", 404))];
                }
                return [4 /*yield*/, app_js_1.redis.setex(key, app_js_1.redisTTL, JSON.stringify(product))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({
                    success: true,
                    message: "Product Name :- ".concat(product === null || product === void 0 ? void 0 : product.name),
                    product: product
                })];
        }
    });
}); });
// add new product - only admin
exports.updateProduct = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, category, price, stock, description, photos, id, product, photosURL, ids;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, category = _a.category, price = _a.price, stock = _a.stock, description = _a.description;
                photos = req.files;
                id = req.params.id;
                return [4 /*yield*/, product_js_1.Product.findById(id)];
            case 1:
                product = _b.sent();
                if (!product) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("Product Not Found", 404))];
                }
                if (!(photos && photos.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, features_js_1.uploadToCloudinary)(photos)];
            case 2:
                photosURL = _b.sent();
                ids = product.photos.map(function (photo) { return photo.public_id; });
                return [4 /*yield*/, (0, features_js_1.deleteFromCloudinary)(ids)];
            case 3:
                _b.sent();
                // Add new photos properly
                photosURL.forEach(function (photo) {
                    product.photos.push({
                        public_id: photo.public_id,
                        url: photo.url
                    });
                });
                _b.label = 4;
            case 4:
                if (name)
                    product.name = name;
                if (price)
                    product.price = price;
                if (stock)
                    product.stock = stock;
                if (category)
                    product.category = category;
                if (description)
                    product.description = description;
                return [4 /*yield*/, product.save()];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, features_js_1.invalidateCache)({
                        product: true,
                        productId: String(product._id),
                        admin: true,
                    })];
            case 6:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Product Updated Successfully",
                    })];
        }
    });
}); });
// Delete Product
exports.deleteProduct = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, ids;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("Please Provide ID", 404))];
                }
                return [4 /*yield*/, product_js_1.Product.findByIdAndDelete(id)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("Product Not Found", 404))];
                }
                ids = product.photos.map(function (photo) { return photo.public_id; });
                return [4 /*yield*/, (0, features_js_1.deleteFromCloudinary)(ids)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, features_js_1.invalidateCache)({
                        product: true,
                        productId: String(product._id),
                        admin: true,
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Delete Product Successfully :- ".concat(product === null || product === void 0 ? void 0 : product.name),
                    })];
        }
    });
}); });
// get all product
exports.getAllProducts = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, search, sort, price, category, page, key, products, totlaPage, cachedData, data, limit, skip, baseQuery, productsPromise, _b, productsFetched, filterOnlyProducts;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, search = _a.search, sort = _a.sort, price = _a.price, category = _a.category;
                page = Number(req.query.page) || 1;
                key = "products-".concat(search, "-").concat(sort, "-").concat(category, "-").concat(price, "-").concat(page);
                return [4 /*yield*/, app_js_1.redis.get(key)];
            case 1:
                cachedData = _c.sent();
                if (!cachedData) return [3 /*break*/, 2];
                data = JSON.parse(cachedData);
                totlaPage = data.totalPage;
                products = data.products;
                return [3 /*break*/, 5];
            case 2:
                limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
                skip = (page - 1) * limit;
                baseQuery = {};
                if (search) {
                    baseQuery.name = {
                        $regex: search,
                        $options: "i"
                    };
                }
                if (price) {
                    baseQuery.price = {
                        $lte: Number(price)
                    };
                }
                if (category) {
                    baseQuery.category = category;
                }
                productsPromise = product_js_1.Product.find(baseQuery)
                    .sort(sort && { price: sort === "asc" ? 1 : -1 })
                    .limit(limit)
                    .skip(skip);
                return [4 /*yield*/, Promise.all([
                        productsPromise,
                        product_js_1.Product.find(baseQuery)
                    ])];
            case 3:
                _b = _c.sent(), productsFetched = _b[0], filterOnlyProducts = _b[1];
                products = productsFetched;
                totlaPage = Math.ceil(filterOnlyProducts.length / limit);
                if (!products || !filterOnlyProducts) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("No Latest Products Data", 404))];
                }
                return [4 /*yield*/, app_js_1.redis.setex(key, 30, JSON.stringify({ products: products, totlaPage: totlaPage }))];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({
                    success: true,
                    message: "products",
                    totalPages: totlaPage,
                    products: products
                })];
        }
    });
}); });
