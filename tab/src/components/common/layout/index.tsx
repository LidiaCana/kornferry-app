import React from "react";
import "./layout.css";
interface ContainerProps {
  children: React.ReactNode;
}
const Layout: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>KPI Dashboard</h1>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>Site design / logo © 2025 ION Analytics; </p>
      </footer>
    </div>
  );
};
export default Layout;
