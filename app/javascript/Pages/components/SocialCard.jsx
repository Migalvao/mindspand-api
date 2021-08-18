import React from "react";
import "./SocialCard.scss";

const SocialCard = ({ newClassData }) => {
  const link = newClassData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="cardSocial">
      <img src={link} alt="photo" className="cardSocial-img" />
      <div className="cardSocial-filter"></div>
      <div className="cardSocial-chip-new">New</div>
      <div className="cardSocial-dif-level">{newClassData.difficulty}</div>
      <h3 className="cardSocial-skill-name">{newClassData.skill.name}</h3>
      <h4 className="cardSocial-class-title">{newClassData.title}</h4>
      <h5 className="cardSocial-teacher-name">{newClassData.teacher.name}</h5>
    </div>
  );
};

export default SocialCard;
