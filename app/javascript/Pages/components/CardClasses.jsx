import React from "react";
import PropTypes from "prop-types";

const CardClasses = ({ classesData }) => {
  //console.log(classesData);
  const link = classesData.teacher.avatar.url + "?tr=w-250,h-300";

  return (
    <div className="card-classes">
      <img src={link} alt="photo" className="card-class-img" />
      <div className="card-class-filter"></div>
      <div className="card-class-chip-new">New</div>
      <div className="card-class-dif-level">{classesData.difficulty}</div>
      <div className="card-class-info">
        <h5
          className="card-class-skill-name"
          style={{ "--colorCategory": `#${classesData.skill.category.color}` }}
        >
          {classesData.skill.name}
        </h5>
        <h4 className="card-class-duration">
          {classesData.no_classes} L&nbsp;
          <span className="card-class-duration-time">
            {classesData.class_duration}min
          </span>
        </h4>

        <h2 className="card-class-title">{classesData.title}</h2>
        <h3 className="card-class-teacher-name">{classesData.teacher.name}</h3>
      </div>
    </div>
  );
};

CardClasses.propTypes = {
  classesData: PropTypes.object.isRequired,
};

export default CardClasses;
