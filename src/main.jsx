import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "../src/Redux/store.js"
import NiceModal from "@ebay/nice-modal-react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
    <BrowserRouter>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
    </BrowserRouter>

    </Provider>
  </>
);
