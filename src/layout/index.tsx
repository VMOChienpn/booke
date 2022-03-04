import { Switch, Route } from "react-router-dom";
import { appRoutes } from "routes/routes.routes";

import Header from "components/header";
import Sidebar from "components/sidebar";
import "./layout.module.css";

export default function Layout() {
  const renderRoutes = (routes: typeof appRoutes) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));

  return (
    <>
      <div className="w-full bg-gray-100">
        <Sidebar />
        <div className="ml-80 content">
          <Header />
          <div className="p-10 mt-24 w-full h-min-content min-h-screen">
            <Switch>{renderRoutes(appRoutes)}</Switch>
          </div>
        </div>
      </div>
    </>
  );
}
