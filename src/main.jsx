import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
// import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key






ReactDOM.createRoot(document.getElementById("root")).render(
  
  <Provider store={store}>
    <App />
  </Provider>
  
);
