import { prisma } from '../prismaSingleton';
import { LarpForCreate, Larp, LarpForUpdate } from '../types';
import { NotFoundError } from '../utils/expressError';
import { Tag } from '../types';

class LarpManager {

  static async createLarp(
    larpData: LarpForCreate,
  ): Promise<Larp> {
    const { tags, orgId, ...data } = larpData;

    const larp: Larp = await prisma.larp.create({
      data: {
        ...data,
        organization: {
          connect: { id: orgId }
        },
        tags: {
          connectOrCreate:
            tags.map((tag: Tag) => (
              {
                where: { name: tag.name },
                create: { name: tag.name }
              }
            ))
        }
      },
      include: {
        tags: true,
        organization: true
      }
    });

    return larp;
  }


  static async getAllLarps(query?: string): Promise<Larp[]> {
    if (!query) {
      return await prisma.larp.findMany(
        {
          orderBy: { start: 'asc' },
          include: { tags: true, organization: true }
        }
      );
    }

    // TODO: implement filtering
    // const cleanQuery = query.split(/\s+/g).join("&");
    //
    // let larps: Larp[] = await prisma.larp.findMany({
    //   where: {
    //     OR: [
    //       { title: { search: cleanQuery } },
    //       { description: { search: cleanQuery } },
    //       { steps: { some: { instructions: { search: cleanQuery } } } },
    //       { steps: { some: { ingredients: { some: { description: { search: cleanQuery } } } } } },
    //     ]
    //   },
    //   orderBy: [
    //     {
    //       _relevance: {
    //         fields: ["name", "description"],
    //         search: cleanQuery,
    //         sort: 'desc',
    //       }
    //     },
    //   ]
    // })
    //
    // return larps;

    //FIXME: delete after implementing filters
    return await prisma.larp.findMany(
      {
        orderBy: { start: 'asc' },
        include: { tags: true, organization: true }
      }
    );
  }


  static async getLarpById(id: number): Promise<Larp> {
    try {
      const larp = await prisma.larp.findUniqueOrThrow({
        where: {
          id: id
        },
        include: {
          tags: true,
          organization: true,
        }
      });
      return larp;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };


  static async updateLarp(newLarp: LarpForUpdate): Promise<Larp> {

    const currentLarp = await prisma.larp.findUniqueOrThrow({
      where: { id: newLarp.id },
      include: { tags: true },
    });

    const newTagNames = newLarp.tags
      ?
      newLarp.tags.map(tag => tag.name)
      :
      [];
    const currTagNames = currentLarp.tags
      ?
      currentLarp.tags.map(tag => tag.name)
      :
      [];
    const tagsToRemove = currentLarp.tags
      ?
      currentLarp.tags
        .filter(tag => !newTagNames.includes(tag.name))
      :
      currentLarp.tags;

    const larp = await prisma.larp.update({
      where: { id: newLarp.id },
      data: {
        title: newLarp.title || currentLarp.title,
        description: newLarp.description || currentLarp.description,
        ticketStatus: newLarp.ticketStatus || currentLarp.ticketStatus,
        start: newLarp.start || currentLarp.start,
        end: newLarp.end || currentLarp.end,
        allDay: newLarp.allDay || currentLarp.allDay,
        imgUrl: newLarp.imgUrl || currentLarp.imgUrl,
        city: newLarp.city || currentLarp.city,
        country: newLarp.country || currentLarp.country,
        language: newLarp.language || currentLarp.language,
        eventUrl: newLarp.eventUrl || currentLarp.eventUrl,
        tags: {
          connectOrCreate: (
            newLarp.tags ? newLarp.tags.map((tag: Tag) => (
              {
                where: { name: tag.name },
                create: { name: tag.name }
              }
            )) : undefined),
          disconnect: tagsToRemove
        },
      },
      include: {
        tags: true,
        organization: true,
      },
    });

    return larp;
  };


  static async deleteLarpById(id: number): Promise<Larp> {
    // try { await this.deleteRecipeImage(id); }
    //   catch(err) {
    //   console.warn(`Image for recipeId ${id} could not be deleted`);
    // }

    try {
      const larp = await prisma.larp.delete({
        where: {
          id: id
        },
        include: {
          tags: true,
          organization: true,
        }
      }
      );
      return larp;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };
  //end class
}

export default LarpManager;