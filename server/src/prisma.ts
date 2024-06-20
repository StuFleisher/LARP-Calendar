import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

if (process.env.NODE_ENV === 'test'){
  jest.mock('./prismaClient', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  }))

  beforeEach(() => {
    mockReset(prismaMock)
  })
}

const prisma = new PrismaClient()
const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

export {prisma, prismaMock}