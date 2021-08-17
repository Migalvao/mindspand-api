import React from "react";
import "./CardCategory.scss";

const CardCategory = ({ categoryData }) => {
  return (
    <div
      className="card-category"
      style={{ "--colorCategory": `#${categoryData.color}` }}
    >
      {categoryData.name}
    </div>
  );
};

export default CardCategory;
