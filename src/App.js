import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 
import './App.css';
import {UserProvider} from "./components/usercontext";
import Activate from "./components/activate";
import Dashboard from "./components/dashboard/dashboard";
import Forgot from "./components/forgot";
import Login from "./components/login";
import Main from "./components/main";
import Resetpassword from "./components/resetpassword";
import Signup from "./components/signup";

function App() {
  return <>
  <UserProvider>
    <Router>
      <Switch>
        <Route path="/" component={Main} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/signup" component={Signup} exact={true}/>
        <Route path="/forgot" component={Forgot} exact={true}/>
        <Route path="/dashboard" component={Dashboard} exact={true}/>
        <Route path="/activateaccount/:token" component={Activate} exact={true}/>
        <Route path="/resetpassword/:token" component={Resetpassword} exact={true}/>
      </Switch>
    </Router>
    </UserProvider>
  </>
}

export default App;
