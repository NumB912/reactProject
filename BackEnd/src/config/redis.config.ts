
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`Redis reconnecting... attempt ${retries}`);
      if (retries > 20) {
        return new Error('Max retries reached');
      }
      return Math.min(retries * 500, 2000); 
    },
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('reconnecting', () => console.log('Redis reconnecting...'));
redisClient.on('end', () => console.warn('Redis connection lost'));

if (!redisClient.isOpen) {
  await redisClient.connect();
}

export default redisClient;