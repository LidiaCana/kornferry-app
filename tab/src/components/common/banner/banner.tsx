import React from "react";
import "./Banner.css";

interface BannerProps {
  children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className="banner">
      <video autoPlay muted loop className="banner-video">
        <source
          src="https://www.kornferry.com/content/dam/kornferry-v2/videos/home-page-video-bkgrd-desktop.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="hero-text cssanimation">
        <h2>
          <span className="skew-text">
            BE <b>MORE</b> THAN
          </span>
        </h2>
        <p>
          The impact we create spans entire organizations, but always starts
          with people.
        </p>

        <div className="cta-btn">{children}</div>
      </div>
    </div>
  );
};

export default Banner;
