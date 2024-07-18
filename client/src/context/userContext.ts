import React from "react";
import { Organization } from "../types";

export type NullableUser = {
  username: string | null,
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  isAdmin: boolean | null,
  organization: Organization | null,
}

const userContext = React.createContext<NullableUser>({
  username: null,
  firstName: null,
  lastName: null,
  email:null,
  isAdmin: null,
  organization: null,
});

const ANON_USER: NullableUser = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  isAdmin: null,
  organization: null,
};

export {userContext, ANON_USER}