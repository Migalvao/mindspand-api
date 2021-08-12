import React from "react";

const SocialCard = ({ newClassData }) => {
  console.log("ola");
  return (
    <div className="card">
      {newClassData.teacher.name} {newClassData.title}
    </div>
  );
};

export default SocialCard;
