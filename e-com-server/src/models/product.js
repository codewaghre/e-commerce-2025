"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    photos: [
        {
            public_id: {
                type: String,
                required: [true, "Please enter Public ID"],
            },
            url: {
                type: String,
                required: [true, "Please enter URL"],
            },
        },
    ],
    price: {
        type: Number,
        required: [true, "Please enter Price"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter Stock"],
    },
    category: {
        type: String,
        required: [true, "Please enter Category"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter Description"],
    },
}, {
    timestamps: true,
});
exports.Product = mongoose_1.default.model("Product", schema);
