import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"; //todo : warning for useHistory change BrowserRouter to Router
import DashboardLogin from "./DashboardComponents/login/DashboardLogin";
import {ThemeProvider} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardRoutes from "./Routes/DashboardRoutes";
import PrivateAdminRoute from "./Routes/PrivateAdminRoute";
import PublicAdminRoute from "./Routes/PublicAdminRoute";
import {createBrowserHistory} from "history";

const customHistory = createBrowserHistory();

const rtlTheme = createMuiTheme({
  direction: 'rtl'
})


function App() {

  return (
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline/>
        <Router history={customHistory}>
          <Switch>
            <Route exact path={'/'} >
              <Redirect from={'/'} to={'admin/login'}/>
            </Route>
            <Route exact path={'/admin'}>
              <Redirect from={'/admin'} to={'/admin/login'}/>
            </Route>
            <PublicAdminRoute path={'/admin/login'}>
              <DashboardLogin/>
            </PublicAdminRoute>

            <PrivateAdminRoute>
              {({location}) => (<DashboardRoutes section={location}/>)}
            </PrivateAdminRoute>
            <Redirect to={'/not-found'}/>
          </Switch>
        </Router>
      </ThemeProvider>
  );
}

export default App;
