import { prisma } from '../../prismaSingleton';
import { jest } from '@jest/globals';

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

import LarpManager from '../LarpManager';
import { Larp, LarpForCreate, LarpForUpdate } from '../../types';
import { BadRequestError, NotFoundError } from '../../utils/expressError';
import { testLarp, testTag } from '../../test/testLarpData';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

beforeEach(jest.clearAllMocks);

describe("Test post events/", function () {

  test("Works", async function () {

    //set up mocks
    mockPrisma.larp.create.mockResolvedValueOnce(testLarp);
    mockPrisma.larp.findUniqueOrThrow.mockResolvedValueOnce(testLarp);

    //run test
    const { id, tags, ...testLarpForCreate} = testLarp;
    const larp = await LarpManager.createLarp({
        ...testLarpForCreate,
        tags
      });

    expect(mockPrisma.larp.create).toHaveBeenCalledWith({
      "data": {
        ...testLarpForCreate,
        "tags": {
          "connectOrCreate":[{
            "where":{"name":testTag.name},
            "create":testTag
          }]
        }
      },
      "include":{tags:true},
    });
    expect(mockPrisma.larp.create).toHaveBeenCalledTimes(1);

    expect(larp).toEqual(testLarp);
  });
});
