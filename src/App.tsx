import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "layout";
import PrivateRoute from "routes/private.routes";
import Login from "pages/login";

function App() {
  const a = 1;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <PrivateRoute>
            <Route exact={false} path="/" component={Layout} />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
