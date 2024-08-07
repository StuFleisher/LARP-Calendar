import { prisma } from '../prismaSingleton';
import { LarpForCreate, Larp, LarpForUpdate } from '../types';
import { NotFoundError } from '../utils/expressError';
import { Tag } from '../types';
import ImageHandler from '../utils/imageHandler';

const LARP_INCLUDE_OBJ = {
  tags: true,
  imgUrl: true,
  organization: { include: { imgUrl: true } }
};

const BUCKET_NAME = process.env.BUCKET_NAME
const DEFAULT_IMG_URL = `https://${BUCKET_NAME}.s3.amazonaws.com/larpImage/default`;

class LarpManager {

  static async createLarp(
    larpData: LarpForCreate,
  ): Promise<Larp> {
    const { tags, orgId, ...data } = larpData;

    const larp: Larp = await prisma.larp.create({
      data: {
        ...data,
        organization: {
          connect: { id: orgId },
        },
        imgUrl: {
          create: {
            sm: `${DEFAULT_IMG_URL}-sm`,
            md: `${DEFAULT_IMG_URL}-md`,
            lg: `${DEFAULT_IMG_URL}-lg`,
          }
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
      include: LARP_INCLUDE_OBJ
    }
    );

    return larp;
  }


  static async getAllLarps(query?: string): Promise<Larp[]> {
    if (!query) {
      return await prisma.larp.findMany(
        {
          orderBy: { start: 'asc' },
          include: LARP_INCLUDE_OBJ
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
        include: LARP_INCLUDE_OBJ
      }
    );
  }


  static async getLarpById(id: number): Promise<Larp> {
    try {
      const larp = await prisma.larp.findUniqueOrThrow({
        where: {
          id: id
        },
        include: LARP_INCLUDE_OBJ
      });
      return larp;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };


  static async updateLarp(newLarp: LarpForUpdate): Promise<Larp> {

    const currentLarp: Larp = await prisma.larp.findUniqueOrThrow({
      where: { id: newLarp.id },
      include: LARP_INCLUDE_OBJ,
    });

    const newTagNames = newLarp.tags
      ?
      newLarp.tags.map(tag => tag.name)
      :
      [];
    // const currTagNames = currentLarp.tags
    //   ?
    //   currentLarp.tags.map(tag => tag.name)
    //   :
    //   [];
    const tagsToRemove = currentLarp.tags
      ?
      currentLarp.tags
        .filter(tag => !newTagNames.includes(tag.name))
      :
      currentLarp.tags;

    const larp:Larp = await prisma.larp.update({
      where: { id: newLarp.id },
      data: {
        title: newLarp.title || currentLarp.title,
        description: newLarp.description || currentLarp.description,
        ticketStatus: newLarp.ticketStatus || currentLarp.ticketStatus,
        start: newLarp.start || currentLarp.start,
        end: newLarp.end || currentLarp.end,
        allDay: newLarp.allDay || currentLarp.allDay,
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
        imgUrl: {
          update: {
            data: {
              sm: newLarp.imgUrl?.sm || currentLarp.imgUrl.sm,
              md: newLarp.imgUrl?.md || currentLarp.imgUrl.md,
              lg: newLarp.imgUrl?.lg || currentLarp.imgUrl.lg,
            },
            where: { id: newLarp.imgSetId }
          }
        }
      },
      include: LARP_INCLUDE_OBJ,
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
        include: LARP_INCLUDE_OBJ
      }
      );
      return larp;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };


  /**************************** IMAGES ***************************************/

  /**Uploads a file to s3 and stores the resulting uri in the imageUrl property
   *
   * @param file: the file to upload
   * @param id: the id for the record to update
   *
   * @returns the updated larp
   */
  static async updateLarpImage(file: Express.Multer.File, id: number) {

    console.log("updateLarpImage")

    const s3Path = `larpImage/larp-${id}`;
    await ImageHandler.uploadAllSizes(file.buffer, s3Path);

    const basePath=`https://${BUCKET_NAME}.s3.amazonaws.com/${s3Path}`
    const larp = await LarpManager.getLarpById(+id);

    if (larp.imgUrl.sm !== `${basePath}-sm`) {
      larp.imgUrl = {
        sm: `${basePath}-sm`,
        md: `${basePath}-md`,
        lg: `${basePath}-lg`,
      };
      return await LarpManager.updateLarp(larp);
    }
    return larp;
  }

  /**Deletes the image associated with the recipeId from s3 and updates the
   * imageUrl field.
   *
   * @param id: the recipeId for the record to update
   *
   * @returns {deleted:{imageUrl:string}}
   */
  // static async deleteRecipeImage(id: number) {
  //   const path = `recipeImage/recipe-${id}`;
  //   await deleteFile(path);

  //   const recipe = await RecipeManager.getRecipeById(id);
  //   recipe.imageSm = `${DEFAULT_IMG_URL}-sm`;
  //   recipe.imageMd = `${DEFAULT_IMG_URL}-md`;
  //   recipe.imageLg = `${DEFAULT_IMG_URL}-lg`;
  //   return await RecipeManager.updateRecipe(recipe);
  // }


  //end class
}
export default LarpManager;