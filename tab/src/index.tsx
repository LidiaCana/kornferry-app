// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";

// const container = document.getElementById("root");
// const root = createRoot(container!);
// root.render(<App />);
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/index.css";

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (!msalInstance.getActiveAccount() && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    event.payload &&
    "account" in event.payload
  ) {
    const account = event.payload.account;
    if (account) {
      msalInstance.setActiveAccount(account);
    }
  }
});

const container = document.getElementById("root");
if (!container) {
  throw new Error(
    "Root container not found. Make sure the element with id 'root' exists in your HTML."
  );
}
const root = createRoot(container);
root.render(<App instance={msalInstance} />);
