import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Link to="/app">이동</Link>
    <Suspense fallback={<div>...loading</div>}>
      <Route path="/app" component={App} />
    </Suspense>
  </BrowserRouter>,
  rootElement
);
