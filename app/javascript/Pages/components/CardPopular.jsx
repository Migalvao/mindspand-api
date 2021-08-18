import React from "react";
import "./CardPopular.scss";

const CardPopular = ({ popularClassData }) => {
  const link = popularClassData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="card-popular">
      <div className="card-popular-img-container">
        <img src={link} alt="photo" className="card-popular-img" />
      </div>
      <div className="card-popular-info">
        <h1 className="card-popular-teacher">
          {popularClassData.teacher.name}
        </h1>
        <h2 className="card-popular-skill">{popularClassData.skill.name}</h2>
      </div>
    </div>
  );
};

export default CardPopular;
