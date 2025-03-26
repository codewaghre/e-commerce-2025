"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = void 0;
var TryCatch = function (fn) { return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
}; };
exports.TryCatch = TryCatch;
