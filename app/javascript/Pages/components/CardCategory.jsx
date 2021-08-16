import React from "react";

const CardCategory = ({ categoryData }) => {
  console.log(categoryData);
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
