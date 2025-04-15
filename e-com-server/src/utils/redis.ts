import { Redis } from "ioredis"

export const connectRedis = (redisURI: string) => {
  const redis = new Redis({
    password: redisURI,
    host: 'redis-10171.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 10171
  })

  redis.on("connect", () => console.log("Redis Connected"));
  redis.on("error", (e) => console.log(e));

  return redis;
};