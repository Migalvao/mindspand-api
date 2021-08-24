import React from "react";

const CardPopular = ({ popularClassData }) => {
  const link = popularClassData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="Media">
      <img src={link} alt="photo" className="Media-figure" />

      <div className="Media-body">
        <div className="Media-body-info">
          <h1 className="Media-teacher">{popularClassData.teacher.name}</h1>
          <h2 className="Media-skill">{popularClassData.skill.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default CardPopular;
