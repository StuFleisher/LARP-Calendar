import { prisma } from '../prismaSingleton';
import { OrganizationForCreate, Organization, OrganizationForUpdate } from '../types';
import { NotFoundError } from '../utils/expressError';

class OrgManager {

  static async createOrg(
    orgData: OrganizationForCreate
  ): Promise<Organization> {

    const org: Organization = await prisma.organization.create({
      data: {
        ...orgData,
        isApproved: false,
      },
    });

    return org;
  }

  static async getAllOrgs(): Promise<Organization[]> {
    return await prisma.organization.findMany(
      {
        orderBy: { id: 'asc' },
      }
    );
  }


  static async getOrganizationById(id: number): Promise<Organization> {
    try {
      const org = await prisma.organization.findUniqueOrThrow({
        where: {
          id: id
        },
        include: { larps: { include: { tags: true } } }
      });
      return org;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };


  static async updateOrg(newOrg: OrganizationForUpdate): Promise<Organization> {

    const currentOrg: OrganizationForUpdate = await prisma.organization.findUniqueOrThrow({
      where: { id: newOrg.id },
    });

    for (let key in newOrg) {
      const typesafeKey = key as keyof OrganizationForUpdate;
      if (newOrg[typesafeKey] !== undefined) {
        (currentOrg as any)[typesafeKey] = newOrg[typesafeKey];
      }
    }

    const org: Organization = await prisma.organization.update({
      where: { id: newOrg.id },
      data: currentOrg as OrganizationForUpdate
    });

    return org;
  };

  static async setApproved(id: number, isApproved: boolean): Promise<Organization> {
    const org: Organization = await prisma.organization.update({
      where: { id },
      data: { isApproved }
    });

    return org;
  }

  static async deleteOrgById(id: number): Promise<Organization> {
    // try { await this.deleteRecipeImage(id); }
    //   catch(err) {
    //   console.warn(`Image for recipeId ${id} could not be deleted`);
    // }

    try {
      const org = await prisma.organization.delete({
        where: {
          id: id
        },

      }
      );
      return org;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };
  //end class
}

export default OrgManager;