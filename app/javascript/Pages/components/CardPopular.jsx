import React from "react";
import "./CardPopular.scss";

const CardPopular = ({ popularClassData }) => {
  return <div className="card-popular">{popularClassData.title}</div>;
};

export default CardPopular;
