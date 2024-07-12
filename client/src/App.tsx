import './App.scss';

import { Box, Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme.tsx';
import { userContext, NullableUser, ANON_USER } from './context/userContext';
import LarpAPI from './util/api.ts';
import { UserForCreate, UserLoginData } from './types/index.ts';

import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList.tsx';
import NavBar from './components/NavBar.tsx';
import { CircularProgress } from '@mui/material';


function App() {

  const [user, setUser] = useState<NullableUser>(ANON_USER);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState<string | null>(null);


  /** Sets state about our current user and token by doing the following:
       * -Stores the users token in local storages
       * -Sets the token property on the ParselyAPI class
       * -Makes an api call and updates the user state
       */
  useEffect(function fetchUserOnMountOrChange() {
    async function fetchUser() {
      try {
        if (token) {
          const username = LarpAPI.getUsernameFromToken(token);
          const userData = await LarpAPI.getUser(username);
          setUser(userData);
        }
      } catch (e) {
        setError(() => `Error fetching user: ${e}`);
      }
    }

    fetchUser();
  }, [token]);

  /** Calls the api with login credentials and tries to log the user in
  * If successful, updates the token and the user states.
  * credentials: {username, password}
  */

  async function login(credentials: UserLoginData) {
    const token = await LarpAPI.userLogin(credentials);
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** Logs the user out
  *  Clears token from localstorage and resets state for the app */
  function logout() {
    setUser(ANON_USER);
    localStorage.removeItem("token");
    LarpAPI.userLogout();
    setToken(null);
  }

  /** Calls the api with user data and tries to create a new account.
   * If successful, updates the token and user states.
   *
   * userInfo:{username, password, firstName, lastName, email}
   */
  async function register(userInfo: UserForCreate) {
    console.log("calling register");
    const token = await LarpAPI.userSignup(userInfo);
    localStorage.setItem("token", token);
    setToken(token);
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box className="App">
          <BrowserRouter>
            <NavBar login={login} />
            <Box className="App-page">
              <Box className="App-errors">
                <Typography variant="h2">Sorry, we had trouble loading the page</Typography>
                <Typography variant="body1" color="charcoal">{error}</Typography>
              </Box>
            </Box>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {
          (token && !user.username)
            ?
            <Box
              className="App-loading"
              width="100%"
            >
              <CircularProgress size="6rem" />
            </Box>
            :
            <userContext.Provider value={user}>
              <BrowserRouter>
                <NavBar login={login} />
                <RoutesList
                  login={login}
                  logout={logout}
                  register={register}
                />
              </BrowserRouter>
            </userContext.Provider>}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
