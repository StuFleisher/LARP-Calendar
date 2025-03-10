import React, {useState, useEffect, useCallback} from "react"
import { UserLoginData, UserForCreate } from "../types";
import { NullableUser, ANON_USER, userContext } from "../context/userContext";
import LarpAPI from "../util/api";

type UserProviderProps = {
  children: React.ReactNode;
}

export default function UserProvider({children}:UserProviderProps){
  const [user, setUser] = useState<NullableUser>(ANON_USER);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string[]|null>(null);


  /** Sets state about our current user and token by doing the following:
       * -Stores the users token in local storages
       * -Sets the token property on the LarpAPI class
       * -Makes an api call and updates the user state
       */
  useEffect(function fetchUserOnMountOrChange() {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        if (token) {
          const username = LarpAPI.getUsernameFromToken(token);
          const userData = await LarpAPI.getUser(username);
          setUser(userData);
        } else {
          setUser(ANON_USER); // If no token, reset to anonymous user
        }
      } catch (e) {
        console.error(e)
        setError(() => [`Error fetching user: ${e}`]);
        setUser(ANON_USER);
      } finally {
        setLoading(false)
      }
    }

    fetchUser();
  }, [token]);



  /** Calls the api with login credentials and tries to log the user in
  * If successful, updates the token and the user states.
  * credentials: {username, password}
  */

  const login= useCallback(async function(credentials: UserLoginData) {
    const token = await LarpAPI.userLogin(credentials);
    localStorage.setItem("token", token);
    setToken(token);
  },[])

  /** Logs the user out
  *  Clears token from localstorage and resets state for the app */
  const logout = useCallback(() => {
    setUser(ANON_USER);
    localStorage.removeItem("token");
    LarpAPI.userLogout();
    setToken(null);
  },[])

  /** Calls the api with user data and tries to create a new account.
   * If successful, updates the token and user states.
   *
   * userInfo:{username, password, firstName, lastName, email}
   */
  const register = useCallback(async function(userInfo: UserForCreate) {
    console.log("calling register");
    const token = await LarpAPI.userSignup(userInfo);
    localStorage.setItem("token", token);
    setToken(token);
  }, [])

  return (
    <userContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      login,
      logout,
      register,
      loading,
      error,
    }}>
      {children}
    </userContext.Provider>
  )
}