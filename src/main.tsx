import React from "react";
import ReactDOM from "react-dom/client";
import ChatApplication from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./slice";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatApplication />
    </Provider>
  </React.StrictMode>
);
