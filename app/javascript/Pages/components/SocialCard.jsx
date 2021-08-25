import React from "react";
import PropTypes from "prop-types";

const SocialCard = ({ newClassData }) => {
  const link = newClassData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="card-social">
      <img src={link} alt="photo" className="card-social-img" />
      <div className="card-social-filter"></div>
      <div className="card-social-chip-new">New</div>
      <div className="card-social-dif-level">{newClassData.difficulty}</div>
      <h3 className="card-social-skill-name">{newClassData.skill.name}</h3>
      <h4 className="card-social-class-title">{newClassData.title}</h4>
      <h5 className="card-social-teacher-name">{newClassData.teacher.name}</h5>
    </div>
  );
};

SocialCard.propTypes = {
  newClassData: PropTypes.object.isRequired,
};

export default SocialCard;
