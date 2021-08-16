import React from "react";

const CardCategory = ({ categoryData }) => {
  console.log(categoryData);
  return <div className="card-categorie">{categoryData.name}</div>;
};

export default CardCategory;
