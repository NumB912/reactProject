
import { disconnectRedis } from '@/config/redis.config';
import prisma from '@/db';


afterAll(async () => {
  await prisma.$disconnect?.();
  await disconnectRedis?.();
}, 10_000);

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

jest.mock('redis', () => {
  const client = {
    connect: jest.fn(),
    on: jest.fn(),
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn(),
    del: jest.fn(),
    quit: jest.fn(),
    isOpen: false,
    isReady: true,
  };
  return {
    createClient: () => client,
  };
});


// jest.mock('ioredis', () =>
//   jest.fn().mockImplementation(() => ({
//     connect: jest.fn(),
//     on: jest.fn(),
//     set: jest.fn(),
//     get: jest.fn(),
//     del: jest.fn(),
//     quit: jest.fn(),
//     status: 'ready',
//   }))
// );