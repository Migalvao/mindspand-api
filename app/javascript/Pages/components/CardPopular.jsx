import React from "react";
import "./CardPopular.scss";

const CardPopular = ({ popularClassData }) => {
  return (
    <div className="card-popular">
      {popularClassData.skill.name}
      {popularClassData.teacher.name}
    </div>
  );
};

export default CardPopular;
