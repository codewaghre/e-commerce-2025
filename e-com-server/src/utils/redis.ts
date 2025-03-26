import { Redis } from "ioredis"

export const connectRedis = (redisURI: string) => {
  const redis = new Redis({
    password: redisURI,
    host: 'redis-15514.c83.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 15514
})

  redis.on("connect", () => console.log("Redis Connected"));
  redis.on("error", (e) => console.log(e));

  return redis;
};