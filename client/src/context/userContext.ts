import React from "react";

export type NullableUser = {
  username: string | null,
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  isOrganizer: boolean | null,
  isAdmin: boolean | null,
}

const userContext = React.createContext<NullableUser>({
  username: null,
  firstName: null,
  lastName: null,
  email:null,
  isAdmin: null,
  isOrganizer: null,
});

const ANON_USER: NullableUser = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  isAdmin: null,
  isOrganizer: null,
};

export {userContext, ANON_USER}