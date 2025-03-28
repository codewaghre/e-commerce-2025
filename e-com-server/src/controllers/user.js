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
exports.deleteUser = exports.getUser = exports.getAllUsers = exports.newUser = void 0;
var user_js_1 = require("../models/user.js");
var asyncHandler_js_1 = require("../middlewares/asyncHandler.js");
var errorHandler_js_1 = require("../utils/errorHandler.js");
// add new user
exports.newUser = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, photo, gender, _id, dob, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, photo = _a.photo, gender = _a.gender, _id = _a._id, dob = _a.dob;
                return [4 /*yield*/, user_js_1.User.findById(_id)];
            case 1:
                user = _b.sent();
                if (user)
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "Welcome, ".concat(user.name),
                        })];
                if (!_id || !name || !email || !photo || !gender || !dob)
                    return [2 /*return*/, next(new errorHandler_js_1.default("Please fill all fields", 400))];
                return [4 /*yield*/, user_js_1.User.create({
                        name: name,
                        email: email,
                        photo: photo,
                        gender: gender,
                        _id: _id,
                        dob: new Date(dob),
                    })];
            case 2:
                user = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Welcome, ".concat(user.name),
                    })];
        }
    });
}); });
// get all user :- Admin Only
exports.getAllUsers = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_js_1.User.find({})];
            case 1:
                users = _a.sent();
                if (!users) {
                    return [2 /*return*/, next(new errorHandler_js_1.default("No Users Found", 400))];
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        countUsers: users.length,
                        users: users,
                    })];
        }
    });
}); });
// Get Single User
exports.getUser = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user_js_1.User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next(new errorHandler_js_1.default("Invalid Id", 400))];
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        user: user,
                    })];
        }
    });
}); });
// Delete User - Admin only
exports.deleteUser = (0, asyncHandler_js_1.TryCatch)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user_js_1.User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next(new errorHandler_js_1.default("Invalid Id", 400))];
                return [4 /*yield*/, user.deleteOne()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "User Deleted Successfully",
                    })];
        }
    });
}); });
