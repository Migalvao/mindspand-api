import React from "react";
import PropTypes from "prop-types";

const CardPopular = ({ popularClassData }) => {
  const link = popularClassData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="media">
      <img src={link} alt="photo" className="media-figure" />

      <div className="media-body">
        <div className="media-body-info">
          <h1 className="media-teacher">{popularClassData.teacher.name}</h1>
          <h2 className="media-skill">{popularClassData.skill.name}</h2>
        </div>
      </div>
    </div>
  );
};

CardPopular.propTypes = {
  popularClassData: PropTypes.object.isRequired,
};

export default CardPopular;
