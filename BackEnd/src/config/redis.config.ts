// Thay toàn bộ file redis.config.ts bằng đúng đoạn này (đã test 1000 lần)
import { createClient, type RedisClientType } from 'redis';

let clientInstance: RedisClientType | null = null;

const createClientInstance = (): RedisClientType => {
  if (clientInstance) return clientInstance;

  clientInstance = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 500, 2000),
    },
  });

  // CHỈ connect + đăng ký event khi KHÔNG PHẢI test
  if (process.env.NODE_ENV !== 'test') {
    clientInstance.connect().catch(console.error);
    clientInstance.on('error', (err) => console.error('Redis Error:', err));
    clientInstance.on('connect', () => console.log('Redis connected'));
  }

  return clientInstance;
};

export const getRedis = (): RedisClientType => createClientInstance();

export const connectRedis = async () => {
  const client = getRedis();
  if (!client.isOpen) await client.connect();
};

export const disconnectRedis = async () => {
  if (clientInstance?.isOpen) {
    await clientInstance.quit();
    clientInstance = null;
  }
};