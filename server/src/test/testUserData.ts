import { User } from '../types';
import { createToken } from '../utils/tokens';

const testUser:User = {
  id:1,
  username:"testUser-username",
  password:"testUser-password",
  firstName:"testUser-first",
  lastName:"testUser-last",
  email:"testUser@test.com",
  isOrganizer:false,
  isAdmin:false,
}
const userToken = createToken(testUser)

const testOrganizerUser:User = {
  id:2,
  username:"testOrganizerUser-username",
  password:"testOrganizerUser-password",
  firstName:"testOrganizerUser-first",
  lastName:"testOrganizerUser-last",
  email:"testOrganizerUser@test.com",
  isOrganizer:false,
  isAdmin:true,
}
const organizerToken = createToken(testUser)

const testAdminUser:User = {
  id:3,
  username:"testAdminUser-username",
  password:"testAdminUser-password",
  firstName:"testAdminUser-first",
  lastName:"testAdminUser-last",
  email:"testAdminUser@test.com",
  isOrganizer:true,
  isAdmin:true,
}
const adminToken = createToken(testAdminUser)

export {
  testUser,
  userToken,
  testOrganizerUser,
  organizerToken,
  testAdminUser,
  adminToken,
}