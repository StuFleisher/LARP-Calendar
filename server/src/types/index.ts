
type PartialWithRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

export type Tag = {
  name: string;
};

/*************************** LARPS */

export type TicketStatus = "AVAILABLE" | "LIMITED" | "SOLD_OUT";

export type LarpForCreate = {
  title: string,
  ticketStatus: TicketStatus,
  tags: Tag[],
  start: Date,
  end: Date,
  allDay: boolean,
  imgUrl: string,
  city: string,
  country: string,
  language: string,
  description: string,
  orgId: number,
  eventUrl: string,
};

export type Larp = LarpForCreate & {
  id: number;
  organization: Organization;
};

export type LarpForUpdate = Omit<
PartialWithRequired<Larp, 'id'>,
'organization'
>

/*************************** USERS */

export type UserForCreate = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  isAdmin: boolean,
};

export type User = UserForCreate & {
  id: number;
  organization: Organization | null;
};

export type PublicUser = Omit<User, 'password'>;

export type UserForUpdate = (
  PartialWithRequired<
    Omit<
      User,
      'organization'
    >,
    'id' | 'username'
  >);

/*************************** ORGANIZATIONS */


export type OrganizationForCreate = {
  username: string;
  orgName: string;
  orgUrl: string;
  imgUrl: string;
  description: string;
  email: string;
};

export type Organization = OrganizationForCreate & {
  isApproved: boolean;
  id: number;
};

export type OrganizationForUpdate = PartialWithRequired<Organization, 'id'>;
