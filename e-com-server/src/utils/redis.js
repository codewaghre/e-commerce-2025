"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
var ioredis_1 = require("ioredis");
var connectRedis = function (redisURI) {
    var redis = new ioredis_1.Redis({
        password: redisURI,
        host: 'redis-15514.c83.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15514
    });
    redis.on("connect", function () { return console.log("Redis Connected"); });
    redis.on("error", function (e) { return console.log(e); });
    return redis;
};
exports.connectRedis = connectRedis;
