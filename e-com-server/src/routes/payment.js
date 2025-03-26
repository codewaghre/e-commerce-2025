"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var onlyAdmin_js_1 = require("../middlewares/onlyAdmin.js");
var payment_js_1 = require("../controllers/payment.js");
var app = express_1.default.Router();
// Payment
app.post("/create", payment_js_1.createPaymentIntent);
app.post("/coupon/new", onlyAdmin_js_1.onlyAdmin, payment_js_1.newCoupon);
app.get("/discount", payment_js_1.applyDiscount);
app.get("/coupon/all", onlyAdmin_js_1.onlyAdmin, payment_js_1.allCoupons);
app.get("/coupon/:id", onlyAdmin_js_1.onlyAdmin, payment_js_1.getCoupon);
app.delete("/coupon/:id", onlyAdmin_js_1.onlyAdmin, payment_js_1.deleteCoupon);
app.put("/coupon/:id", onlyAdmin_js_1.onlyAdmin, payment_js_1.updateCoupon);
exports.default = app;
