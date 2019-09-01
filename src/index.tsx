import App from "./App";
import { render } from "react-dom";
import React from "react";
import "./style/global.css";
import "./style/reset.css";
import "./style/variables.css";

const container = document.querySelector("#helpfood");
// investigate on this
// container.setAttribute('type', "module")

render(<App />, container);
