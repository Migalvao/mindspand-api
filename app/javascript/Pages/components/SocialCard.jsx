import React from "react";

const SocialCard = ({ newClassData }) => {
  const link = newClassData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="card">
      <img src={link} alt="photo" className="card__img" />
      <div className="card__filter"></div>
      <div className="card__chip-new">New</div>
      <div className="card__dif-level">{newClassData.difficulty}</div>
      <h3>{newClassData.skill.name}</h3>
      <h4>{newClassData.title}</h4>
      <h5>{newClassData.teacher.name}</h5>
    </div>
  );
};

export default SocialCard;
