import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' exact={true} >
          <Dashboard></Dashboard>
        </PrivateRoute>

        <Route path='/login' >
          <Login />
        </Route>

        {/* path('*') means that it will always match everything */}
        <Route path='*' >      
          <Error />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
