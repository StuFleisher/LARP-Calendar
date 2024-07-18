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
        isApproved:false,
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
        include: {
          larps: true
        }
      });
      return org;
    } catch (err) {
      //use our custom error instead
      throw new NotFoundError("Record not found");
    }
  };


  static async updateOrg(newOrg: OrganizationForUpdate): Promise<Organization> {

    const currentOrg: Organization = await prisma.organization.findUniqueOrThrow({
      where: { id: newOrg.id },
      include: { larps: true },
    });

    const updatedOrg: Partial<Organization> = {...currentOrg}

    for (const key in newOrg) {
      if (newOrg[key as keyof Organization] !== undefined) {
        (updatedOrg as any)[key as keyof Organization] = newOrg[key as keyof Organization];
      }
    }

    const org:Organization = await prisma.organization.update({
      where: { id: newOrg.id },
      data: updatedOrg
  });

    return org;
  };

  static async setApproved(id: number, isApproved:boolean):Promise<Organization> {
    const org:Organization = await prisma.organization.update({
      where: { id },
      data: {isApproved}
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