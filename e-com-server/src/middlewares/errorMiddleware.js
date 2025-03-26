"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
var errorMiddleware = function (err, req, res, next) {
    var statusCode = err.statusCode || 500;
    var message = err.message || 'Something went wrong!';
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};
exports.errorMiddleware = errorMiddleware;
