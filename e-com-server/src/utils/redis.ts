import { Redis } from "ioredis"



export const connectRedis = (redisURI: string, redisHost : string, redisPort: string) => {
  const redis = new Redis({
    password: redisURI,
    host: redisHost,
    port: Number(redisPort)
  })

  redis.on("connect", () => console.log("Redis Connected"));
  redis.on("error", (e) => console.log(e));

  return redis;
};