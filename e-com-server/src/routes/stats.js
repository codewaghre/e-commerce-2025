"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var onlyAdmin_js_1 = require("../middlewares/onlyAdmin.js");
var stats_js_1 = require("../controllers/stats.js");
var app = express_1.default.Router();
// route - /api/v1/dashboard/stats
app.get("/stats", onlyAdmin_js_1.onlyAdmin, stats_js_1.getDashboardStats);
// route - /api/v1/dashboard/pie
app.get("/pie", onlyAdmin_js_1.onlyAdmin, stats_js_1.getPieCharts);
// route - /api/v1/dashboard/bar
app.get("/bar", onlyAdmin_js_1.onlyAdmin, stats_js_1.getBarCharts);
// route - /api/v1/dashboard/line
app.get("/line", onlyAdmin_js_1.onlyAdmin, stats_js_1.getLineCharts);
exports.default = app;
