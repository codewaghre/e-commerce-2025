"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.redisTTL = exports.stripe = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var morgan_1 = require("morgan");
var db_js_1 = require("./utils/db.js");
var contance_js_1 = require("./utils/contance.js");
var errorMiddleware_js_1 = require("./middlewares/errorMiddleware.js");
var stripe_1 = require("stripe");
var cookie_parser_1 = require("cookie-parser");
var cloudinary_1 = require("cloudinary");
//Importing Routes
var user_js_1 = require("./routes/user.js");
var product_js_1 = require("./routes/product.js");
var order_js_1 = require("./routes/order.js");
var payment_js_1 = require("./routes/payment.js");
var stats_js_1 = require("./routes/stats.js");
var redis_js_1 = require("./utils/redis.js");
(0, dotenv_1.config)({
    path: "./.env",
});
var port = process.env.PORT;
var stripeKey = process.env.STRIPE_KEY || "";
exports.stripe = new stripe_1.default(stripeKey);
var redisURI = process.env.REDIS_URI_PASSWORD || "";
exports.redisTTL = process.env.REDIS_TTL || 60 * 60 * 4;
// Connect Database
(0, db_js_1.connectDB)().then(function () {
    console.log("Database name:- ".concat(contance_js_1.DB_NAME));
}).catch(function (error) {
    console.log(error.message);
});
exports.redis = (0, redis_js_1.connectRedis)(redisURI);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_APP_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: process.env.ALLOW_ORIGIN,
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.get("/", function (req, res) {
    res.send("API Working with /api/v1 hello test");
});
// all Routes
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/product", product_js_1.default);
app.use("/api/v1/order", order_js_1.default);
app.use("/api/v1/payment", payment_js_1.default);
app.use("/api/v1/dashboard", stats_js_1.default);
//make uploads folder static
app.use("/uploads", express_1.default.static("uploads"));
//handler Error Middleware
app.use(errorMiddleware_js_1.errorMiddleware);
app.listen(port, function () {
    console.log(" server is running on ".concat(port, " testing...."));
});
