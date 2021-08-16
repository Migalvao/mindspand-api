import React from "react";

const CardCategory = ({ categoryData }) => {
  console.log(categoryData);
  return <div className="card-category">{categoryData.name}</div>;
};

export default CardCategory;
