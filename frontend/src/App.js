import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EmailVerification from './components/EmailVerification';
import PasswordRecovery from './components/PasswordRecovery';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/verify-email/:token" component={EmailVerification} />
        <Route path="/password-recovery" component={PasswordRecovery} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

function App() {
    return (
      <div className="App">
        <h1>Welcome to MERN Auth App</h1>
      </div>
    );
  }

export default App;
