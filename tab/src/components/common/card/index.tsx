import React from "react";
import "./card.css";

interface CardProp {
  title: string;
  actual: string;
  goal: string;
  url: string;
}
const Card: React.FC<CardProp> = ({ title, actual, goal, url }) => {
  return (
    <div className="card-container">
      <h4>{title}</h4>
      <div className="row">
        <div className="widget">
          <p className="red">
            {actual}
            <span>Actual</span>
          </p>
          <p className="green">
            {goal}
            <span>Goal</span>
          </p>
        </div>
        <a href={url} target="_blank" className="button">
          View Details
        </a>
      </div>
    </div>
  );
};
export default Card;
