import React, { useEffect } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";
import "./navbar.css";
import { Button } from "@fluentui/react-components";

export const NavigationBar: React.FC = () => {
  const { instance, accounts } = useMsal();

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
  };

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  const logoUrl =
    "https://www.kornferry.com/content/experience-fragments/kornferry-v2/en/header/master/_jcr_content/root/header/mainHeader%20containerMax%20d-flex%20justify-space-between%20align-center/headerLogo.coreimg.svg/1738567242801/kf-logo-green.svg";

  useEffect(() => {
    if (accounts.length > 0) {
      // Perform any action needed with the account
      console.log("Active account:", accounts[0]);
    }
    // You can also call any function or API here
  }, [accounts]);
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoUrl} alt="Logo" className="logo-image" />
      </div>
      <div className="navbar-right">
        <p>
          {" "}
          Welcome
          <span className="username">{accounts[0]?.name}</span>
        </p>
        <AuthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <Button onClick={handleLogoutRedirect}>Sign out</Button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <Button onClick={handleLoginRedirect}>Sign in</Button>
          </div>
        </UnauthenticatedTemplate>
      </div>
    </nav>
  );
};
