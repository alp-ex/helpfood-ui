import { Route, Switch } from "react-router-dom";

// FIXME : add paths in tsconfig
import Schedule from "./pages/Schedule";
import React from "react";
import Recipes from "./pages/Recipes";
import ShopList from "./pages/ShopList";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/schedule" component={Schedule} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/shoplist" component={ShopList} />
    </Switch>
  );
};

export default Router;
