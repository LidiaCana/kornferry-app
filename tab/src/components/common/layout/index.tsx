import React from "react";
import "./layout.css";
import { NavigationBar } from "../NavBar/NavigationBar";
interface ContainerProps {
  children: React.ReactNode;
}
const Layout: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="layout">
      <NavigationBar />
      <div className="main-content">
        <main className="">{children}</main>
      </div>
      <footer className="footer">
        <p>Site design / logo © 2025 ION Analytics; </p>
      </footer>
    </div>
  );
};
export default Layout;
