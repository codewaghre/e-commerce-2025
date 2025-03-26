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
exports.getLineCharts = exports.getBarCharts = exports.getPieCharts = exports.getDashboardStats = void 0;
var asyncHandler_js_1 = require("../middlewares/asyncHandler.js");
var order_js_1 = require("../models/order.js");
var product_js_1 = require("../models/product.js");
var user_js_1 = require("../models/user.js");
var features_js_1 = require("../utils/features.js");
var app_js_1 = require("../app.js");
// get Dashbaord
exports.getDashboardStats = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var stats, key, today_1, sixMonthsAgo, thisMonth, lastMonth, thisMonthProductsPromise, lastMonthProductsPromise, thisMonthUsersPromise, lastMonthUsersPromise, thisMonthOrdersPromise, lastMonthOrdersPromise, lastSixMonthOrdersPromise, latestTransactionsPromise, _a, thisMonthProducts, thisMonthUsers, thisMonthOrders, lastMonthProducts, lastMonthUsers, lastMonthOrders, productsCount, usersCount, allOrders, lastSixMonthOrders, categories, femaleUsersCount, latestTransaction, thisMonthRevenue, lastMonthRevenue, changePercent, revenue, count, orderMonthCounts_1, orderMonthyRevenue_1, categoryCount, userRatio, modifiedLatestTransaction;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                key = "admin-stats";
                return [4 /*yield*/, app_js_1.redis.get(key)];
            case 1:
                stats = _b.sent();
                if (!stats) return [3 /*break*/, 2];
                stats = JSON.parse(stats);
                return [3 /*break*/, 6];
            case 2:
                today_1 = new Date();
                sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                thisMonth = {
                    start: new Date(today_1.getFullYear(), today_1.getMonth(), 1),
                    end: today_1
                };
                lastMonth = {
                    start: new Date(today_1.getFullYear(), today_1.getMonth() - 1, 1),
                    end: new Date(today_1.getFullYear(), today_1.getMonth(), 0),
                };
                thisMonthProductsPromise = product_js_1.Product.find({
                    createdAt: {
                        $gte: thisMonth.start,
                        $lte: thisMonth.end
                    }
                });
                lastMonthProductsPromise = product_js_1.Product.find({
                    createdAt: {
                        $gte: lastMonth.start,
                        $lte: lastMonth.end
                    }
                });
                thisMonthUsersPromise = user_js_1.User.find({
                    createdAt: {
                        $gte: thisMonth.start,
                        $lte: thisMonth.end
                    }
                });
                lastMonthUsersPromise = user_js_1.User.find({
                    createdAt: {
                        $gte: lastMonth.start,
                        $lte: lastMonth.end
                    }
                });
                thisMonthOrdersPromise = order_js_1.Order.find({
                    createdAt: {
                        $gte: thisMonth.start,
                        $lte: thisMonth.end
                    }
                });
                lastMonthOrdersPromise = order_js_1.Order.find({
                    createdAt: {
                        $gte: lastMonth.start,
                        $lte: lastMonth.end
                    }
                });
                lastSixMonthOrdersPromise = order_js_1.Order.find({
                    createdAt: {
                        $gte: sixMonthsAgo,
                        $lte: today_1,
                    },
                });
                latestTransactionsPromise = order_js_1.Order.find({})
                    .select(["orderItems", "discount", "total", "status"])
                    .limit(4);
                return [4 /*yield*/, Promise.all([
                        thisMonthProductsPromise,
                        thisMonthUsersPromise,
                        thisMonthOrdersPromise,
                        lastMonthProductsPromise,
                        lastMonthUsersPromise,
                        lastMonthOrdersPromise,
                        product_js_1.Product.countDocuments(),
                        user_js_1.User.countDocuments(),
                        order_js_1.Order.find({}).select("total"),
                        lastSixMonthOrdersPromise,
                        product_js_1.Product.distinct("category"),
                        user_js_1.User.countDocuments({ gender: "female" }),
                        latestTransactionsPromise,
                    ])];
            case 3:
                _a = _b.sent(), thisMonthProducts = _a[0], thisMonthUsers = _a[1], thisMonthOrders = _a[2], lastMonthProducts = _a[3], lastMonthUsers = _a[4], lastMonthOrders = _a[5], productsCount = _a[6], usersCount = _a[7], allOrders = _a[8], lastSixMonthOrders = _a[9], categories = _a[10], femaleUsersCount = _a[11], latestTransaction = _a[12];
                console.log("thisMonthOrders", thisMonthOrders);
                thisMonthRevenue = thisMonthOrders.reduce(function (total, order) {
                    // console.log("total", total);
                    // console.log("order", order);
                    return total + (order.total || 0);
                }, 0);
                lastMonthRevenue = lastMonthOrders.reduce(function (total, order) {
                    return total + (order.total || 0);
                }, 0);
                changePercent = {
                    revenue: (0, features_js_1.calculatePercent)(thisMonthRevenue, lastMonthRevenue),
                    Product: (0, features_js_1.calculatePercent)(thisMonthProducts.length, lastMonthProducts.length),
                    user: (0, features_js_1.calculatePercent)(thisMonthUsers.length, lastMonthUsers.length),
                    order: (0, features_js_1.calculatePercent)(thisMonthOrders.length, lastMonthOrders.length)
                };
                revenue = allOrders.reduce(function (total, order) { return total + (order.total || 0); }, 0);
                count = {
                    revenue: revenue,
                    product: productsCount,
                    user: usersCount,
                    order: allOrders.length,
                };
                orderMonthCounts_1 = new Array(6).fill(0);
                orderMonthyRevenue_1 = new Array(6).fill(0);
                lastSixMonthOrders.forEach(function (order) {
                    var creationDate = order.createdAt;
                    var monthDiff = (today_1.getMonth() - creationDate.getMonth() + 12) % 12;
                    if (monthDiff < 6) {
                        orderMonthCounts_1[6 - monthDiff - 1] += 1;
                        orderMonthyRevenue_1[6 - monthDiff - 1] += order.total;
                    }
                });
                return [4 /*yield*/, (0, features_js_1.getInventories)({
                        categories: categories,
                        productsCount: productsCount,
                    })];
            case 4:
                categoryCount = _b.sent();
                userRatio = {
                    male: usersCount - femaleUsersCount,
                    female: femaleUsersCount,
                };
                modifiedLatestTransaction = latestTransaction.map(function (i) { return ({
                    _id: i._id,
                    discount: i.discount,
                    amount: i.total,
                    quantity: i.orderItems.length,
                    status: i.status,
                }); });
                stats = {
                    categoryCount: categoryCount,
                    changePercent: changePercent,
                    count: count,
                    chart: {
                        order: orderMonthCounts_1,
                        revenue: orderMonthyRevenue_1,
                    },
                    userRatio: userRatio,
                    latestTransaction: modifiedLatestTransaction,
                };
                return [4 /*yield*/, app_js_1.redis.setex(key, app_js_1.redisTTL, JSON.stringify(stats))];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/, res.status(200).json({
                    success: true,
                    stats: stats
                })];
        }
    });
}); });
// get pie Chart
exports.getPieCharts = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var charts, key, allOrderPromise, _a, processingOrder, shippedOrder, deliveredOrder, categories, productsCount, outOfStock, allOrders, allUsers, adminUsers, customerUsers, orderFullfillment, productCategories, stockAvailablity, grossIncome, discount, productionCost, burnt, marketingCost, netMargin, revenueDistribution, usersAgeGroup, adminCustomer;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                key = "admin-pie-charts";
                return [4 /*yield*/, app_js_1.redis.get(key)];
            case 1:
                charts = _b.sent();
                if (!charts) return [3 /*break*/, 2];
                charts = JSON.parse(charts);
                return [3 /*break*/, 6];
            case 2:
                allOrderPromise = order_js_1.Order.find({}).select([
                    "total",
                    "discount",
                    "subtotal",
                    "tax",
                    "shippingCharges",
                ]);
                return [4 /*yield*/, Promise.all([
                        order_js_1.Order.countDocuments({ status: "Processing" }),
                        order_js_1.Order.countDocuments({ status: "Shipped" }),
                        order_js_1.Order.countDocuments({ status: "Delivered" }),
                        product_js_1.Product.distinct("category"),
                        product_js_1.Product.countDocuments(),
                        product_js_1.Product.countDocuments({ stock: 0 }),
                        allOrderPromise,
                        user_js_1.User.find({}).select(["dob"]),
                        user_js_1.User.countDocuments({ role: "admin" }),
                        user_js_1.User.countDocuments({ role: "user" }),
                    ])];
            case 3:
                _a = _b.sent(), processingOrder = _a[0], shippedOrder = _a[1], deliveredOrder = _a[2], categories = _a[3], productsCount = _a[4], outOfStock = _a[5], allOrders = _a[6], allUsers = _a[7], adminUsers = _a[8], customerUsers = _a[9];
                orderFullfillment = {
                    processing: processingOrder,
                    shipped: shippedOrder,
                    delivered: deliveredOrder,
                };
                return [4 /*yield*/, (0, features_js_1.getInventories)({
                        categories: categories,
                        productsCount: productsCount,
                    })];
            case 4:
                productCategories = _b.sent();
                stockAvailablity = {
                    inStock: productsCount - outOfStock,
                    outOfStock: outOfStock,
                };
                grossIncome = allOrders.reduce(function (prev, order) { return prev + (order.total || 0); }, 0);
                discount = allOrders.reduce(function (prev, order) { return prev + (order.discount || 0); }, 0);
                productionCost = allOrders.reduce(function (prev, order) { return prev + (order.shippingCharges || 0); }, 0);
                burnt = allOrders.reduce(function (prev, order) { return prev + (order.tax || 0); }, 0);
                marketingCost = Math.round(grossIncome * (30 / 100));
                netMargin = grossIncome - discount - productionCost - burnt - marketingCost;
                revenueDistribution = {
                    netMargin: netMargin,
                    discount: discount,
                    productionCost: productionCost,
                    burnt: burnt,
                    marketingCost: marketingCost,
                };
                usersAgeGroup = {
                    teen: allUsers.filter(function (i) { return i.age < 20; }).length,
                    adult: allUsers.filter(function (i) { return i.age >= 20 && i.age < 40; }).length,
                    old: allUsers.filter(function (i) { return i.age >= 40; }).length,
                };
                adminCustomer = {
                    admin: adminUsers,
                    customer: customerUsers,
                };
                charts = {
                    orderFullfillment: orderFullfillment,
                    productCategories: productCategories,
                    stockAvailablity: stockAvailablity,
                    revenueDistribution: revenueDistribution,
                    usersAgeGroup: usersAgeGroup,
                    adminCustomer: adminCustomer,
                };
                return [4 /*yield*/, app_js_1.redis.setex(key, app_js_1.redisTTL, JSON.stringify(charts))];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/, res.status(200).json({
                    success: true,
                    charts: charts,
                })];
        }
    });
}); });
// get Bar Chart
exports.getBarCharts = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var charts, key, today, sixMonthsAgo, twelveMonthsAgo, sixMonthProductPromise, sixMonthUsersPromise, twelveMonthOrdersPromise, _a, products, users, orders, productCounts, usersCounts, ordersCounts;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                key = "admin-bar-charts";
                return [4 /*yield*/, app_js_1.redis.get(key)];
            case 1:
                charts = _b.sent();
                if (!charts) return [3 /*break*/, 2];
                charts = JSON.parse(charts);
                return [3 /*break*/, 5];
            case 2:
                today = new Date();
                sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                twelveMonthsAgo = new Date();
                twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
                sixMonthProductPromise = product_js_1.Product.find({
                    createdAt: {
                        $gte: sixMonthsAgo,
                        $lte: today,
                    },
                }).select("createdAt");
                sixMonthUsersPromise = user_js_1.User.find({
                    createdAt: {
                        $gte: sixMonthsAgo,
                        $lte: today,
                    },
                }).select("createdAt");
                twelveMonthOrdersPromise = order_js_1.Order.find({
                    createdAt: {
                        $gte: twelveMonthsAgo,
                        $lte: today,
                    },
                }).select("createdAt");
                return [4 /*yield*/, Promise.all([
                        sixMonthProductPromise,
                        sixMonthUsersPromise,
                        twelveMonthOrdersPromise,
                    ])];
            case 3:
                _a = _b.sent(), products = _a[0], users = _a[1], orders = _a[2];
                productCounts = (0, features_js_1.getChartData)({ length: 6, today: today, docArr: products });
                usersCounts = (0, features_js_1.getChartData)({ length: 6, today: today, docArr: users });
                ordersCounts = (0, features_js_1.getChartData)({ length: 12, today: today, docArr: orders });
                charts = {
                    users: usersCounts,
                    products: productCounts,
                    orders: ordersCounts,
                };
                return [4 /*yield*/, app_js_1.redis.setex(key, app_js_1.redisTTL, JSON.stringify(charts))];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [2 /*return*/, res.status(200).json({
                    success: true,
                    charts: charts,
                })];
        }
    });
}); });
// get line Chart
exports.getLineCharts = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var charts, key, today, twelveMonthsAgo, baseQuery, _a, products, users, orders, productCounts, usersCounts, discount, revenue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                key = "admin-line-charts";
                return [4 /*yield*/, app_js_1.redis.get(key)];
            case 1:
                charts = _b.sent();
                if (!charts) return [3 /*break*/, 2];
                charts = JSON.parse(charts);
                return [3 /*break*/, 5];
            case 2:
                today = new Date();
                twelveMonthsAgo = new Date();
                twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
                baseQuery = {
                    createdAt: {
                        $gte: twelveMonthsAgo,
                        $lte: today,
                    },
                };
                return [4 /*yield*/, Promise.all([
                        product_js_1.Product.find(baseQuery).select("createdAt"),
                        user_js_1.User.find(baseQuery).select("createdAt"),
                        order_js_1.Order.find(baseQuery).select(["createdAt", "discount", "total"]),
                    ])];
            case 3:
                _a = _b.sent(), products = _a[0], users = _a[1], orders = _a[2];
                productCounts = (0, features_js_1.getChartData)({ length: 12, today: today, docArr: products });
                usersCounts = (0, features_js_1.getChartData)({ length: 12, today: today, docArr: users });
                discount = (0, features_js_1.getChartData)({
                    length: 12,
                    today: today,
                    docArr: orders,
                    property: "discount",
                });
                revenue = (0, features_js_1.getChartData)({
                    length: 12,
                    today: today,
                    docArr: orders,
                    property: "total",
                });
                charts = {
                    users: usersCounts,
                    products: productCounts,
                    discount: discount,
                    revenue: revenue,
                };
                return [4 /*yield*/, app_js_1.redis.setex(key, app_js_1.redisTTL, JSON.stringify(charts))];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [2 /*return*/, res.status(200).json({
                    success: true,
                    charts: charts,
                })];
        }
    });
}); });
